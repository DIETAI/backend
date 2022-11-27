"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenCookieOptions = exports.accessTokenCookieOptions = void 0;
exports.accessTokenCookieOptions = {
    maxAge: 900000,
    httpOnly: true,
    // domain: process.env.NODE_ENV === 'dev' ? 'localhost' : 'mederak.com',
    domain: 'mederak.com',
    path: '/',
    // sameSite: 'strict',
    sameSite: 'none',
    // secure: false,
    secure: true,
};
exports.refreshTokenCookieOptions = Object.assign(Object.assign({}, exports.accessTokenCookieOptions), { maxAge: 3.154e10 });
//https://medium.com/swlh/working-with-cookies-and-creating-cookies-in-javascript-764eb95aa4a1
