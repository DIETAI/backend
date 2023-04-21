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
exports.deleteMeasurement = exports.getAndUpdateMeasurement = exports.getMeasurements = exports.getMeasurement = exports.createMeasurement = void 0;
const measurement_model_1 = __importDefault(require("../models/measurement.model"));
const metrics_1 = require("../utils/metrics");
function createMeasurement(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const metricsLabels = {
            operation: 'createMeasurement',
        };
        const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
        try {
            const result = yield measurement_model_1.default.create(input);
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'true' }));
            return result;
        }
        catch (e) {
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'false' }));
            throw e;
        }
    });
}
exports.createMeasurement = createMeasurement;
function getMeasurement(query, options = { lean: true }) {
    return __awaiter(this, void 0, void 0, function* () {
        const metricsLabels = {
            operation: 'getMeasurement',
        };
        const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
        try {
            const result = yield measurement_model_1.default.findOne(query, {}, options)
                .populate({
                path: 'client',
                select: ['_id', 'name', 'lastName'],
            })
                .populate({
                path: 'images',
                select: ['_id', 'imageURL'],
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
exports.getMeasurement = getMeasurement;
function getMeasurements(query, options = { lean: true }) {
    return __awaiter(this, void 0, void 0, function* () {
        const metricsLabels = {
            operation: 'getMeasurements',
        };
        const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
        try {
            const result = yield measurement_model_1.default.find(query, {}, options)
                .populate({
                path: 'client',
                select: ['_id', 'name', 'lastName'],
            })
                .populate({
                path: 'images',
                select: ['_id', 'imageURL'],
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
exports.getMeasurements = getMeasurements;
function getAndUpdateMeasurement(query, update, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return measurement_model_1.default.findOneAndUpdate(query, update, options);
    });
}
exports.getAndUpdateMeasurement = getAndUpdateMeasurement;
function deleteMeasurement(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return measurement_model_1.default.deleteOne(query);
    });
}
exports.deleteMeasurement = deleteMeasurement;
