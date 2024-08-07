import { get } from 'lodash';
import { FilterQuery, UpdateQuery } from 'mongoose';
import SessionModel from '../models/session.model';
import { ISessionDocument } from '../interfaces/session.interfaces';
import { verifyJwt, signJwt } from '../utils/jwt.utils';
import { getUser } from './user.service';

export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent });

  return session.toJSON();
}

export async function findSessions(query: FilterQuery<ISessionDocument>) {
  return SessionModel.find(query).lean();
}

export async function updateSession(
  query: FilterQuery<ISessionDocument>,
  update: UpdateQuery<ISessionDocument>
) {
  return SessionModel.updateOne(query, update);
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJwt(refreshToken, 'refreshTokenPublicKey');

  if (!decoded || !get(decoded, 'session')) return false;

  const session = await SessionModel.findById(get(decoded, 'session'));

  if (!session || !session.valid) return false;

  const user = await getUser({ _id: session.user });

  if (!user) return false;

  const accessToken = signJwt(
    { ...user, session: session._id },
    'accessTokenPrivateKey',
    { expiresIn: '15m' } // 15 minutes
  );

  return accessToken;
}
