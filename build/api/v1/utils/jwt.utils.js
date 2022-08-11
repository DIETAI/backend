"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getPrivateKey = (keyName) => {
    if (keyName === 'accessTokenPrivateKey') {
        return process.env.ACCESS_TOKEN_PRIVATE_KEY;
    }
    return process.env.REFRESH_PRIVATE_KEY;
};
const getPublicKey = (keyName) => {
    if (keyName === 'accessTokenPublicKey') {
        return process.env.ACCESS_TOKEN_PUBLIC_KEY;
    }
    return process.env.REFRESH_PUBLIC_KEY;
};
function signJwt(object, keyName, options) {
    const signingKey = Buffer.from(getPrivateKey(keyName), 'base64').toString('ascii');
    return jsonwebtoken_1.default.sign(object, signingKey, Object.assign(Object.assign({}, (options && options)), { algorithm: 'RS256' }));
}
exports.signJwt = signJwt;
function verifyJwt(token, keyName) {
    const publicKey = Buffer.from(getPublicKey(keyName), 'base64').toString('ascii');
    try {
        const decoded = jsonwebtoken_1.default.verify(token, publicKey);
        return {
            valid: true,
            expired: false,
            decoded,
        };
    }
    catch (e) {
        console.error(e);
        return {
            valid: false,
            expired: e.message === 'jwt expired',
            decoded: null,
        };
    }
}
exports.verifyJwt = verifyJwt;
