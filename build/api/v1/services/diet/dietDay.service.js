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
exports.deleteDietDay = exports.getAndUpdateDietDay = exports.getDietDays = exports.getDietDay = exports.createDietDay = void 0;
const dietDay_model_1 = __importDefault(require("../../models/dietDay.model"));
const metrics_1 = require("../../utils/metrics");
function createDietDay(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const metricsLabels = {
            operation: 'createDietDay',
        };
        const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
        try {
            const result = yield dietDay_model_1.default.create(input);
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'true' }));
            return result;
        }
        catch (e) {
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'false' }));
            throw e;
        }
    });
}
exports.createDietDay = createDietDay;
function getDietDay(query, options = { lean: true }) {
    return __awaiter(this, void 0, void 0, function* () {
        const metricsLabels = {
            operation: 'getDietDay',
        };
        const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
        try {
            const result = yield dietDay_model_1.default.findOne(query, {}, options);
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'true' }));
            return result;
        }
        catch (e) {
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'false' }));
            throw e;
        }
    });
}
exports.getDietDay = getDietDay;
function getDietDays(query, options = { lean: true }) {
    return __awaiter(this, void 0, void 0, function* () {
        const metricsLabels = {
            operation: 'getDietDays',
        };
        const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
        try {
            const result = yield dietDay_model_1.default.find(query, {}, options);
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'true' }));
            return result;
        }
        catch (e) {
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'false' }));
            throw e;
        }
    });
}
exports.getDietDays = getDietDays;
function getAndUpdateDietDay(query, update, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return dietDay_model_1.default.findOneAndUpdate(query, update, options);
    });
}
exports.getAndUpdateDietDay = getAndUpdateDietDay;
function deleteDietDay(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return dietDay_model_1.default.deleteOne(query);
    });
}
exports.deleteDietDay = deleteDietDay;
