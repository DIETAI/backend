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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleOAuthController = exports.deleteUserSessionController = exports.getUserSessionsController = exports.createUserSessionController = void 0;
const config_1 = __importDefault(require("config"));
const session_service_1 = require("../services/session.service");
const user_service_1 = require("../services/user.service");
const jwt_utils_1 = require("../utils/jwt.utils");
const logger_1 = __importDefault(require("../utils/logger"));
const cookieOptions_1 = require("../utils/cookieOptions");
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
        const accessToken = (0, jwt_utils_1.signJwt)(Object.assign(Object.assign({}, user), { session: session._id }), 'accessTokenPrivateKey', { expiresIn: config_1.default.get('accessTokenTtl') } // 15 minutes,
        );
        // create a refresh token
        const refreshToken = (0, jwt_utils_1.signJwt)(Object.assign(Object.assign({}, user), { session: session._id }), 'refreshTokenPrivateKey', { expiresIn: config_1.default.get('refreshTokenTtl') } // 15 minutes
        );
        // return access & refresh tokens
        res.cookie('accessToken', accessToken, {
            maxAge: 900000,
            httpOnly: true,
            domain: 'localhost',
            path: '/',
            sameSite: 'strict',
            secure: false,
        });
        res.cookie('refreshToken', refreshToken, {
            maxAge: 3.154e10,
            httpOnly: true,
            domain: 'localhost',
            path: '/',
            sameSite: 'strict',
            secure: false,
        });
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
            domain: 'localhost',
            path: '/',
            sameSite: 'strict',
            secure: false,
        });
        res.cookie('refreshToken', '', {
            maxAge: -3.154e10,
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
    });
}
exports.deleteUserSessionController = deleteUserSessionController;
function googleOAuthController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // get the code from qs
        const code = req.query.code;
        try {
            // get the id and access token with the code
            const { id_token, access_token } = yield (0, user_service_1.getGoogleOAuthTokens)({ code });
            console.log({ id_token, access_token });
            // get user with tokens
            const googleUser = yield (0, user_service_1.getGoogleUser)({ id_token, access_token });
            //jwt.decode(id_token);
            console.log({ googleUser });
            if (!googleUser.verified_email) {
                return res.status(403).send('Google account is not verified');
            }
            // upsert the user
            // create or login user
            const user = yield (0, user_service_1.findAndUpdateUser)({
                email: googleUser.email,
            }, {
                email: googleUser.email,
                name: googleUser.name,
                picture: googleUser.picture,
            }, {
                upsert: true,
                new: true,
            });
            if (!user) {
                return res.status(403).send('User not found');
            }
            // create a session
            // create a session
            const session = yield (0, session_service_1.createSession)(user._id, req.get('user-agent') || '');
            // create an access token
            const accessToken = (0, jwt_utils_1.signJwt)(Object.assign(Object.assign({}, user), { session: session._id }), 'accessTokenPrivateKey', { expiresIn: config_1.default.get('accessTokenTtl') } // 15 minutes
            );
            // create a refresh token
            const refreshToken = (0, jwt_utils_1.signJwt)(Object.assign(Object.assign({}, user), { session: session._id }), 'refreshTokenPrivateKey', { expiresIn: config_1.default.get('refreshTokenTtl') } // 1 year
            );
            // set cookies
            res.cookie('accessToken', accessToken, cookieOptions_1.accessTokenCookieOptions);
            res.cookie('refreshToken', refreshToken, cookieOptions_1.refreshTokenCookieOptions);
            // redirect back to client
            res.redirect(config_1.default.get('origin'));
        }
        catch (error) {
            logger_1.default.error(error, 'Failed to authorize Google user');
            return res.redirect(`${config_1.default.get('origin')}/oauth/error`);
        }
    });
}
exports.googleOAuthController = googleOAuthController;
