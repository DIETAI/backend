"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenCookieOptions = exports.accessTokenCookieOptions = void 0;
exports.accessTokenCookieOptions = {
    maxAge: 900000,
    httpOnly: true,
    domain: 'localhost',
    path: '/',
    sameSite: 'strict',
    secure: false,
};
exports.refreshTokenCookieOptions = Object.assign(Object.assign({}, exports.accessTokenCookieOptions), { maxAge: 3.154e10 });
