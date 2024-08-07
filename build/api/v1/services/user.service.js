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
exports.validateEmail = exports.findAndUpdateUser = exports.getUser = exports.validatePassword = exports.createUser = void 0;
const lodash_1 = require("lodash");
const user_model_1 = __importDefault(require("../models/user.model"));
function createUser(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.default.create(input);
            return (0, lodash_1.omit)(user.toJSON(), 'password');
        }
        catch (e) {
            throw new Error(e);
        }
    });
}
exports.createUser = createUser;
function validatePassword({ email, password, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return false;
        }
        const isValid = yield user.comparePassword(password);
        if (!isValid)
            return false;
        return (0, lodash_1.omit)(user.toJSON(), 'password');
    });
}
exports.validatePassword = validatePassword;
function getUser(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return user_model_1.default.findOne(query).lean();
    });
}
exports.getUser = getUser;
// export async function getGoogleOAuthTokens({
//   code,
// }: {
//   code: string;
// }): Promise<GoogleTokensResult> {
//   const url = 'https://oauth2.googleapis.com/token';
//   const values = {
//     code,
//     client_id: config.get('googleClientId'),
//     client_secret: config.get('googleClientSecret'),
//     redirect_uri: config.get('googleOauthRedirectUrl'),
//     grant_type: 'authorization_code',
//   };
//   try {
//     const res = await axios.post<GoogleTokensResult>(
//       url,
//       qs.stringify(values),
//       {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       }
//     );
//     return res.data;
//   } catch (error: any) {
//     console.error(error.response.data.error);
//     log.error(error, 'Failed to fetch Google Oauth Tokens');
//     throw new Error(error.message);
//   }
// }
// interface GoogleUserResult {
//   id: string;
//   email: string;
//   verified_email: boolean;
//   name: string;
//   given_name: string;
//   family_name: string;
//   picture: string;
//   locale: string;
// }
// export async function getGoogleUser({
//   id_token,
//   access_token,
// }: {
//   id_token: string;
//   access_token: string;
// }): Promise<GoogleUserResult> {
//   try {
//     const res = await axios.get<GoogleUserResult>(
//       `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
//       {
//         headers: {
//           Authorization: `Bearer ${id_token}`,
//         },
//       }
//     );
//     return res.data;
//   } catch (error: any) {
//     log.error(error, 'Error fetching Google user');
//     throw new Error(error.message);
//   }
// }
function findAndUpdateUser(query, update, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        return user_model_1.default.findOneAndUpdate(query, update, options);
    });
}
exports.findAndUpdateUser = findAndUpdateUser;
function validateEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield user_model_1.default.findOne({ email });
        if (existingUser) {
            return true;
        }
        return false;
    });
}
exports.validateEmail = validateEmail;
