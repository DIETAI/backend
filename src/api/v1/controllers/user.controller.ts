import { Request, Response } from 'express';
import config from 'config';
import { CreateUserInput } from '../schema/user.schema';
import { createUser, getUser, validateEmail } from '../services/user.service';
import { createSession } from '../services/session.service';
import { signJwt } from '../utils/jwt.utils';
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from '../utils/cookieOptions';

import logger from '../utils/logger';

export async function createUserController(
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response
) {
  try {
    console.log('createUser');

    const email = req.body.email;
    const existingUserEmail = await validateEmail(email);
    if (existingUserEmail) {
      return res
        .status(400)
        .json({ msg: 'There is already a user with this email address' });
    }

    const user = await createUser(req.body);

    if (!user) {
      return res
        .status(500)
        .json({ msg: 'A server error occurred during registration' });
    }

    console.log({ createdUser: user });

    // create a session
    const session = await createSession(user._id, req.get('user-agent') || '');

    if (!session) {
      return res.status(200).json({
        msg: 'User created but an error occurred while creating the session',
        user,
      });
    }

    // create an access token
    const accessToken = signJwt(
      { ...user, session: session._id },
      'accessTokenPrivateKey',
      { expiresIn: config.get('accessTokenTtl') } // 15 minutes,
    );

    // create a refresh token
    const refreshToken = signJwt(
      { ...user, session: session._id },
      'refreshTokenPrivateKey',
      { expiresIn: config.get('refreshTokenTtl') } // 15 minutes
    );

    res.cookie('accessToken', accessToken, accessTokenCookieOptions);
    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

    return res.send({ user, accessToken, refreshToken });
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getUserController(req: Request, res: Response) {
  console.log('pobieranie danych użytkownika');
  const userId = req.userId;
  console.log({ userId });
  const user = await getUser({ uid: userId });

  console.log({ user });

  if (!user) {
    return res.sendStatus(404);
  }

  return res.send(user);
}
