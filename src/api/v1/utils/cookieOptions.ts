import { CookieOptions } from 'express';

export const accessTokenCookieOptions: CookieOptions = {
  maxAge: 900000, // 15 mins
  httpOnly: true,
  // domain: process.env.NODE_ENV === 'development' ? 'localhost' : 'mederak.com',
  domain: '.mederak.com, localhost',
  path: '/',
  // sameSite: 'strict',
  sameSite: 'none',
  secure: false,
};

export const refreshTokenCookieOptions: CookieOptions = {
  ...accessTokenCookieOptions,
  maxAge: 3.154e10, // 1 year
};
