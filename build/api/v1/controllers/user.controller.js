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
exports.updateUserController = exports.getUserController = exports.createUserController = void 0;
const user_v1_service_1 = require("../services/user-v1.service");
const logger_1 = __importDefault(require("../utils/logger"));
function createUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('createUser');
            const email = req.body.email;
            const existingUserEmail = yield (0, user_v1_service_1.validateEmail)(email);
            if (existingUserEmail) {
                return res
                    .status(409)
                    .json({ msg: 'There is already a user with this email address' });
            }
            const user = yield (0, user_v1_service_1.createUser)(req.body);
            if (!user) {
                return res
                    .status(500)
                    .json({ msg: 'A server error occurred during registration' });
            }
            // create a session
            // const session = await createSession(user._id, req.get('user-agent') || '');
            // if (!session) {
            //   return res.status(200).json({
            //     msg: 'User created but an error occurred while creating the session',
            //     user,
            //   });
            // }
            // // create an access token
            // const accessToken = signJwt(
            //   { ...user, session: session._id },
            //   'accessTokenPrivateKey',
            //   { expiresIn: '15m' } // 15 minutes,
            // );
            // // create a refresh token
            // const refreshToken = signJwt(
            //   { ...user, session: session._id },
            //   'refreshTokenPrivateKey',
            //   { expiresIn: '1y' }
            // );
            // res.cookie('accessToken', accessToken, accessTokenCookieOptions);
            // res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);
            // const { decoded, expired } = verifyJwt(accessToken, 'accessTokenPublicKey');
            // res.locals.user = decoded;
            //correct
            console.log('Udało się dodać uzytkownika');
            return res.send({ user });
        }
        catch (e) {
            logger_1.default.error(e);
            console.log(e);
            return res.status(404).send(e.message);
        }
    });
}
exports.createUserController = createUserController;
function getUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const user = yield (0, user_v1_service_1.getUser)({ _id: userId });
        if (!user) {
            return res.sendStatus(404);
        }
        const userData = {
            name: user.name,
            lastName: user.lastName,
            fullName: user.getFullName(),
            email: user.email,
            emailVerified: user.emailVerified,
            avatar: user.avatar,
        };
        return res.send(userData);
    });
}
exports.getUserController = getUserController;
function updateUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const update = req.body;
        const userId = res.locals.user._id;
        const user = yield (0, user_v1_service_1.getUser)({ _id: userId });
        if (!user) {
            return res.sendStatus(404);
        }
        const updatedUser = yield (0, user_v1_service_1.getAndUpdateUser)({ _id: userId }, update, {
            new: true,
        });
        if (!updatedUser) {
            return res.sendStatus(404);
        }
        const updatedUserData = {
            name: updatedUser.name,
            lastName: updatedUser.lastName,
            fullName: updatedUser.getFullName(),
            email: updatedUser.email,
            emailVerified: updatedUser.emailVerified,
            avatar: updatedUser.avatar,
        };
        return res.send(updatedUserData);
    });
}
exports.updateUserController = updateUserController;
