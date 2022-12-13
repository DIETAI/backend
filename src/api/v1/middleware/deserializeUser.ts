import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt.utils';
import { reIssueAccessToken } from '../services/session.service';
import { accessTokenCookieOptions } from '../utils/cookieOptions';

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken =
    get(req, 'cookies.accessToken') ||
    get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');

  // console.log({ accessToken });

  const refreshToken =
    get(req, 'cookies.refreshToken') || get(req, 'headers.x-refresh');

  // console.log({ refreshToken });

  //przeniesc pod
  if (accessToken) {
    const { decoded, expired } = verifyJwt(accessToken, 'accessTokenPublicKey');

    // console.log({ decoded });

    if (decoded) {
      res.locals.user = decoded;
      return next();
    }
  }

  // if (expired && refreshToken)
  if (refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });
    console.log({ newAccessToken });

    if (!newAccessToken) {
      return next();
    }

    res.setHeader('x-access-token', newAccessToken);

    res.cookie('accessToken', newAccessToken, accessTokenCookieOptions);

    const result = verifyJwt(newAccessToken as string, 'accessTokenPublicKey');

    res.locals.user = result.decoded;
    return next();
  }

  return next();
};

export default deserializeUser;
