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
      { expiresIn: '15m' } // 15 minutes,
    );

    // create a refresh token
    const refreshToken = signJwt(
      { ...user, session: session._id },
      'refreshTokenPrivateKey',
      { expiresIn: '1y' }
    );

    res.cookie('accessToken', accessToken, accessTokenCookieOptions);
    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

    //correct
    console.log('Udało się dodać uzytkownika');

    return res.send({ user, accessToken, refreshToken });
  } catch (e: any) {
    logger.error(e);
    console.log(e);
    return res.status(409).send(e.message);
  }
}

export async function getUserController(req: Request, res: Response) {
  console.log('pobieranie danych użytkownika');
  const userId = res.locals.user._id;
  console.log({ userId });
  const user = await getUser({ uid: userId });

  console.log({ host: req.hostname });

  console.log({ user });

  if (!user) {
    return res.sendStatus(404);
  }

  return res.send(user);
}

export async function updateUserController(
  req: Request<{}, {}, EditUserInput['body']>,
  res: Response
) {
  const update = req.body;
  const userId = res.locals.user._id;
  const user = (await getUser({ uid: userId })) as IUserDocument;

  if (!user) {
    return res.sendStatus(404);
  }

  const userData = user.toObject();

  const newUserData = {
    ...userData,
    photoURL: update.photoURL,
    name: update.name,
    lastName: update.lastName,
    fullName: update.fullName,
  };

  console.log({ newUserData });

  const updatedUser = await getAndUpdateUser({ _id: userId }, newUserData, {
    new: true,
  });

  return res.send(updatedUser);
}
