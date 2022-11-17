"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenCookieOptions = exports.accessTokenCookieOptions = void 0;
exports.accessTokenCookieOptions = {
    maxAge: 900000,
    httpOnly: true,
    domain: process.env.NODE_ENV === 'development'
        ? 'localhost'
        : 'diet-ai-vaq5g.ondigitalocean.app',
    path: '/',
    sameSite: 'strict',
    secure: false,
};
exports.refreshTokenCookieOptions = Object.assign(Object.assign({}, exports.accessTokenCookieOptions), { maxAge: 3.154e10 });
