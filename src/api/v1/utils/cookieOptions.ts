import { CookieOptions } from 'express';

export const accessTokenCookieOptions: CookieOptions = {
  maxAge: 900000, // 15 mins
  httpOnly: true,
  // domain: process.env.NODE_ENV === 'development' ? 'localhost' : 'mederak.com',
  // domain: 'localhost',
  path: '/',
  // sameSite: 'strict',
  sameSite: 'none',
  // secure: false,
  secure: true,
};

export const refreshTokenCookieOptions: CookieOptions = {
  ...accessTokenCookieOptions,
  maxAge: 3.154e10, // 1 year
};
