"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserSessionController = exports.getUserSessionsController = exports.createUserSessionController = void 0;
const session_service_1 = require("../services/session.service");
const user_service_1 = require("../services/user.service");
const jwt_utils_1 = require("../utils/jwt.utils");
const cookieOptions_1 = require("../utils/cookieOptions");
const origin = process.env.ORIGIN || 'http://localhost:3000';
function createUserSessionController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Validate the user's password
        const user = yield (0, user_service_1.validatePassword)(req.body);
        if (!user) {
            return res.status(401).send('Invalid email or password');
        }
        // create a session
        const session = yield (0, session_service_1.createSession)(user._id, req.get('user-agent') || '');
        // create an access token
        const accessToken = (0, jwt_utils_1.signJwt)(Object.assign(Object.assign({}, user), { session: session._id }), 'accessTokenPrivateKey', { expiresIn: '15m' } // 15 minutes,
        );
        // create a refresh token
        const refreshToken = (0, jwt_utils_1.signJwt)(Object.assign(Object.assign({}, user), { session: session._id }), 'refreshTokenPrivateKey', { expiresIn: '1y' });
        // return access & refresh tokens
        // res.cookie('accessToken', accessToken, {
        //   maxAge: 900000, // 15 mins
        //   httpOnly: true,
        //   domain: 'mederak.com',
        //   path: '/',
        //   sameSite: 'none',
        //   secure: true,
        // });
        // res.cookie('refreshToken', refreshToken, {
        //   maxAge: 3.154e10, // 1 year
        //   httpOnly: true,
        //   domain: 'mederak.com',
        //   path: '/',
        //   sameSite: 'none',
        //   secure: true,
        // });
        res.cookie('accessToken', accessToken, cookieOptions_1.accessTokenCookieOptions);
        res.cookie('refreshToken', refreshToken, cookieOptions_1.refreshTokenCookieOptions);
        return res.send({ accessToken, refreshToken });
    });
}
exports.createUserSessionController = createUserSessionController;
function getUserSessionsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const sessions = yield (0, session_service_1.findSessions)({ user: userId, valid: true });
        return res.send(sessions);
    });
}
exports.getUserSessionsController = getUserSessionsController;
function deleteUserSessionController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const sessionId = res.locals.user.session;
        yield (0, session_service_1.updateSession)({ _id: sessionId }, { valid: false });
        res.cookie('accessToken', '', {
            maxAge: -900000,
            httpOnly: true,
            // domain: 'mederak.com',
            domain: process.env.NODE_ENV === 'dev' ? 'localhost' : 'mederak.com',
            path: '/',
            sameSite: 'none',
            secure: true,
        });
        res.cookie('refreshToken', '', {
            maxAge: -3.154e10,
            httpOnly: true,
            // domain: 'mederak.com',
            domain: process.env.NODE_ENV === 'dev' ? 'localhost' : 'mederak.com',
            path: '/',
            sameSite: 'none',
            secure: true,
        });
        return res.send({
            accessToken: null,
            refreshToken: null,
        });
    });
}
exports.deleteUserSessionController = deleteUserSessionController;
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
