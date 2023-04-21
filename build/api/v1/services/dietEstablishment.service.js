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
exports.deleteDietEstablishment = exports.getAndUpdateDietEstablishment = exports.getDietEstablishments = exports.getDietEstablishment = exports.createDietEstablishment = void 0;
const dietEstablishments_model_1 = __importDefault(require("../models/dietEstablishments.model"));
const metrics_1 = require("../utils/metrics");
function createDietEstablishment(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const metricsLabels = {
            operation: 'createDietEstablishment',
        };
        const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
        try {
            const result = yield dietEstablishments_model_1.default.create(input);
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'true' }));
            return result;
        }
        catch (e) {
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'false' }));
            throw e;
        }
    });
}
exports.createDietEstablishment = createDietEstablishment;
function getDietEstablishment(query, options = { lean: true }) {
    return __awaiter(this, void 0, void 0, function* () {
        const metricsLabels = {
            operation: 'getDietEstablishment',
        };
        const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
        try {
            const result = yield dietEstablishments_model_1.default.findOne(query, {}, options)
                .populate({
                path: 'client',
                select: ['_id', 'name', 'lastName'],
            })
                .populate({
                path: 'dietKind',
                select: ['_id', 'name', 'type'],
            })
                .populate({
                path: 'measurementId',
                select: ['_id', 'name', 'cpm'],
            });
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'true' }));
            return result;
        }
        catch (e) {
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'false' }));
            throw e;
        }
    });
}
exports.getDietEstablishment = getDietEstablishment;
function getDietEstablishments(query, options = { lean: true }) {
    return __awaiter(this, void 0, void 0, function* () {
        const metricsLabels = {
            operation: 'getDietEstablishments',
        };
        const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
        try {
            const result = yield dietEstablishments_model_1.default.find(query, {}, options)
                .populate({
                path: 'client',
                select: ['_id', 'name', 'lastName'],
            })
                .populate({
                path: 'dietKind',
                select: ['_id', 'name', 'type'],
            })
                .populate({
                path: 'measurementId',
                select: ['_id', 'name', 'cpm'],
            });
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'true' }));
            return result;
        }
        catch (e) {
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'false' }));
            throw e;
        }
    });
}
exports.getDietEstablishments = getDietEstablishments;
function getAndUpdateDietEstablishment(query, update, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return dietEstablishments_model_1.default.findOneAndUpdate(query, update, options);
    });
}
exports.getAndUpdateDietEstablishment = getAndUpdateDietEstablishment;
function deleteDietEstablishment(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return dietEstablishments_model_1.default.deleteOne(query);
    });
}
exports.deleteDietEstablishment = deleteDietEstablishment;
