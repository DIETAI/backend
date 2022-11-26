import { CookieOptions, Request, Response } from 'express';
import {
  createSession,
  findSessions,
  updateSession,
} from '../services/session.service';
import {
  validatePassword,
  findAndUpdateUser,
  // getGoogleOAuthTokens,
  // getGoogleUser,
} from '../services/user.service';
import { signJwt } from '../utils/jwt.utils';
import log from '../utils/logger';
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from '../utils/cookieOptions';

const origin = process.env.ORIGIN || 'http://localhost:3000';

export async function createUserSessionController(req: Request, res: Response) {
  // Validate the user's password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send('Invalid email or password');
  }

  // create a session
  const session = await createSession(user._id, req.get('user-agent') || '');

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

  // // return access & refresh tokens
  // res.cookie('accessToken', accessToken, {
  //   maxAge: 900000, // 15 mins
  //   httpOnly: true,
  //   domain: 'localhost',
  //   path: '/',
  //   sameSite: 'strict',
  //   secure: false,
  // });

  // res.cookie('refreshToken', refreshToken, {
  //   maxAge: 3.154e10, // 1 year
  //   httpOnly: true,
  //   domain: 'localhost',
  //   path: '/',
  //   sameSite: 'strict',
  //   secure: false,
  // });

  res.cookie('accessToken', accessToken, accessTokenCookieOptions);
  res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionsController(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
}

export async function deleteUserSessionController(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  res.cookie('accessToken', '', {
    maxAge: -900000, // 15 mins
    httpOnly: true,
    domain: 'localhost',
    path: '/',
    sameSite: 'strict',
    secure: false,
  });

  res.cookie('refreshToken', '', {
    maxAge: -3.154e10, // 1 year
    httpOnly: true,
    domain: 'localhost',
    path: '/',
    sameSite: 'strict',
    secure: false,
  });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}

// export async function googleOAuthController(req: Request, res: Response) {
//   // get the code from qs
//   const code = req.query.code as string;

//   try {
//     // get the id and access token with the code
//     const { id_token, access_token } = await getGoogleOAuthTokens({ code });
//     console.log({ id_token, access_token });

//     // get user with tokens
//     const googleUser = await getGoogleUser({ id_token, access_token });
//     //jwt.decode(id_token);

//     console.log({ googleUser });

//     if (!googleUser.verified_email) {
//       return res.status(403).send('Google account is not verified');
//     }

//     // upsert the user
//     // create or login user
//     const user = await findAndUpdateUser(
//       {
//         email: googleUser.email,
//       },
//       {
//         email: googleUser.email,
//         name: googleUser.name,
//         picture: googleUser.picture,
//       },
//       {
//         upsert: true,
//         new: true,
//       }
//     );

//     if (!user) {
//       return res.status(403).send('User not found');
//     }

//     // create a session
//     // create a session
//     const session = await createSession(user._id, req.get('user-agent') || '');

//     // create an access token
//     const accessToken = signJwt(
//       { ...user, session: session._id },
//       'accessTokenPrivateKey',
//       { expiresIn: '15m' } // 15 minutes
//     );

//     // create a refresh token
//     const refreshToken = signJwt(
//       { ...user, session: session._id },
//       'refreshTokenPrivateKey',
//       { expiresIn: '1y' } // 1 year
//     );

//     // set cookies
//     res.cookie('accessToken', accessToken, accessTokenCookieOptions);
//     res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

//     // redirect back to client
//     res.redirect(origin);
//   } catch (error) {
//     log.error(error, 'Failed to authorize Google user');
//     return res.redirect(`${origin}/oauth/error`);
//   }
// }
