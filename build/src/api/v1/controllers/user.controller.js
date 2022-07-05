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
exports.getUserController = exports.createUserController = void 0;
const config_1 = __importDefault(require("config"));
const user_v1_service_1 = require("../services/user-v1.service");
const session_service_1 = require("../services/session.service");
const jwt_utils_1 = require("../utils/jwt.utils");
const cookieOptions_1 = require("../utils/cookieOptions");
const logger_1 = __importDefault(require("../utils/logger"));
function createUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('createUser');
            const email = req.body.email;
            const existingUserEmail = yield (0, user_v1_service_1.validateEmail)(email);
            if (existingUserEmail) {
                return res
                    .status(400)
                    .json({ msg: 'There is already a user with this email address' });
            }
            const user = yield (0, user_v1_service_1.createUser)(req.body);
            if (!user) {
                return res
                    .status(500)
                    .json({ msg: 'A server error occurred during registration' });
            }
            console.log({ createdUser: user });
            // create a session
            const session = yield (0, session_service_1.createSession)(user._id, req.get('user-agent') || '');
            if (!session) {
                return res.status(200).json({
                    msg: 'User created but an error occurred while creating the session',
                    user,
                });
            }
            // create an access token
            const accessToken = (0, jwt_utils_1.signJwt)(Object.assign(Object.assign({}, user), { session: session._id }), 'accessTokenPrivateKey', { expiresIn: config_1.default.get('accessTokenTtl') } // 15 minutes,
            );
            // create a refresh token
            const refreshToken = (0, jwt_utils_1.signJwt)(Object.assign(Object.assign({}, user), { session: session._id }), 'refreshTokenPrivateKey', { expiresIn: config_1.default.get('refreshTokenTtl') } // 15 minutes
            );
            res.cookie('accessToken', accessToken, cookieOptions_1.accessTokenCookieOptions);
            res.cookie('refreshToken', refreshToken, cookieOptions_1.refreshTokenCookieOptions);
            return res.send({ user, accessToken, refreshToken });
        }
        catch (e) {
            logger_1.default.error(e);
            return res.status(409).send(e.message);
        }
    });
}
exports.createUserController = createUserController;
function getUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('pobieranie danych użytkownika');
        const userId = res.locals.user._id;
        console.log({ userId });
        const user = yield (0, user_v1_service_1.getUser)({ uid: userId });
        console.log({ user });
        if (!user) {
            return res.sendStatus(404);
        }
        return res.send(user);
    });
}
exports.getUserController = getUserController;
