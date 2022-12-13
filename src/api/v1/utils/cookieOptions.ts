import { CookieOptions } from 'express';

export const accessTokenCookieOptions: CookieOptions = {
  maxAge: 900000, // 15 mins
  httpOnly: true,
  domain: process.env.NODE_ENV === 'dev' ? 'localhost' : 'dietai.pl',
  // domain: 'mederak.com',
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

//https://medium.com/swlh/working-with-cookies-and-creating-cookies-in-javascript-764eb95aa4a1
