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
exports.validateEmail = exports.getUser = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const metrics_1 = require("../utils/metrics");
const role_model_1 = __importDefault(require("../models/role.model"));
function createUser(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const metricsLabels = {
            operation: 'createUser',
        };
        const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
        try {
            const result = yield user_model_1.default.create(input);
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'true' }));
            return result;
        }
        catch (e) {
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'false' }));
            throw e;
        }
    });
}
exports.createUser = createUser;
function getUser(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const metricsLabels = {
            operation: 'getUser',
        };
        const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
        try {
            const user = yield user_model_1.default.findOne(query);
            if (!(user === null || user === void 0 ? void 0 : user.role)) {
                timer(Object.assign(Object.assign({}, metricsLabels), { success: 'true' }));
                return user;
            }
            const userRole = yield role_model_1.default.findOne(user.role);
            if (!userRole) {
                timer(Object.assign(Object.assign({}, metricsLabels), { success: 'true' }));
                return user;
            }
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'true' }));
            return Object.assign(Object.assign({}, user), { role: {
                    id: userRole._id,
                    name: userRole.type,
                } });
        }
        catch (e) {
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'false' }));
            throw e;
        }
    });
}
exports.getUser = getUser;
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
