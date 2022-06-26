import { CookieOptions } from 'express';

export const accessTokenCookieOptions: CookieOptions = {
  maxAge: 900000, // 15 mins
  httpOnly: true,
  domain: 'localhost',
  path: '/',
  sameSite: 'strict',
  secure: false,
};

export const refreshTokenCookieOptions: CookieOptions = {
  ...accessTokenCookieOptions,
  maxAge: 3.154e10, // 1 year
};
