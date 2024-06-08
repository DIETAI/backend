import { Request, Response } from 'express';
import { CreateUserInput, EditUserInput } from '../schema/user.schema';
import {
  createUser,
  getAndUpdateUser,
  getUser,
  validateEmail,
} from '../services/user-v1.service';
import { createSession } from '../services/session.service';
import { signJwt } from '../utils/jwt.utils';
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from '../utils/cookieOptions';

import logger from '../utils/logger';
import { IUserDocument } from '../interfaces/user.interfaces';
import { verifyJwt } from '../utils/jwt.utils';

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
        .status(409)
        .json({ msg: 'There is already a user with this email address' });
    }

    const user = await createUser(req.body);

    if (!user) {
      return res
        .status(500)
        .json({ msg: 'A server error occurred during registration' });
    }

    // create a session
    // const session = await createSession(user._id, req.get('user-agent') || '');

    // if (!session) {
    //   return res.status(200).json({
    //     msg: 'User created but an error occurred while creating the session',
    //     user,
    //   });
    // }

    // // create an access token
    // const accessToken = signJwt(
    //   { ...user, session: session._id },
    //   'accessTokenPrivateKey',
    //   { expiresIn: '15m' } // 15 minutes,
    // );

    // // create a refresh token
    // const refreshToken = signJwt(
    //   { ...user, session: session._id },
    //   'refreshTokenPrivateKey',
    //   { expiresIn: '1y' }
    // );

    // res.cookie('accessToken', accessToken, accessTokenCookieOptions);
    // res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

    // const { decoded, expired } = verifyJwt(accessToken, 'accessTokenPublicKey');
    // res.locals.user = decoded;

    //correct
    console.log('Udało się dodać uzytkownika');

    return res.send({ user });
  } catch (e: any) {
    logger.error(e);
    console.log(e);
    return res.status(404).send(e.message);
  }
}

export async function getUserController(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const user = await getUser({ _id: userId });

  if (!user) {
    return res.sendStatus(404);
  }

  const userData = {
    name: user.name,
    lastName: user.lastName,
    fullName: user.getFullName(),
    email: user.email,
    emailVerified: user.emailVerified,
    avatar: user.avatar,
  };

  return res.send(userData);
}

export async function updateUserController(
  req: Request<{}, {}, EditUserInput['body']>,
  res: Response
) {
  const update = req.body;
  const userId = res.locals.user._id;
  const user = await getUser({ _id: userId });

  if (!user) {
    return res.sendStatus(404);
  }

  const updatedUser = await getAndUpdateUser({ _id: userId }, update, {
    new: true,
  });

  if (!updatedUser) {
    return res.sendStatus(404);
  }

  const updatedUserData = {
    name: updatedUser.name,
    lastName: updatedUser.lastName,
    fullName: updatedUser.getFullName(),
    email: updatedUser.email,
    emailVerified: updatedUser.emailVerified,
    avatar: updatedUser.avatar,
  };

  return res.send(updatedUserData);
}
