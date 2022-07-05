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
exports.deleteMeasurementController = exports.getMeasurementsController = exports.getMeasurementController = exports.updateMeasurementController = exports.createMeasurementController = void 0;
const measurement_service_1 = require("../services/measurement.service");
function createMeasurementController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const body = req.body;
        const measurement = yield (0, measurement_service_1.createMeasurement)(Object.assign(Object.assign({}, body), { user: userId }));
        return res.send(measurement);
    });
}
exports.createMeasurementController = createMeasurementController;
function updateMeasurementController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const measurementId = req.params.measurementId;
        const update = req.body;
        const measurement = yield (0, measurement_service_1.getMeasurement)({ _id: measurementId });
        if (!measurement) {
            return res.sendStatus(404);
        }
        if (String(measurement.user) !== userId) {
            return res.sendStatus(403);
        }
        const updatedMeasurement = yield (0, measurement_service_1.getAndUpdateMeasurement)({ _id: measurementId }, update, {
            new: true,
        });
        return res.send(updatedMeasurement);
    });
}
exports.updateMeasurementController = updateMeasurementController;
function getMeasurementController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const measurementId = req.params.measurementId;
        const measurement = yield (0, measurement_service_1.getMeasurement)({ _id: measurementId });
        if (!measurement) {
            return res.sendStatus(404);
        }
        if (String(measurement.user) !== userId) {
            return res.sendStatus(403);
        }
        return res.send(measurement);
    });
}
exports.getMeasurementController = getMeasurementController;
function getMeasurementsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const measurements = yield (0, measurement_service_1.getMeasurements)({ user: userId });
        if (!measurements) {
            return res.sendStatus(404);
        }
        return res.send(measurements);
    });
}
exports.getMeasurementsController = getMeasurementsController;
function deleteMeasurementController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const measurementId = req.params.measurementId;
        const measurement = yield (0, measurement_service_1.getMeasurement)({ _id: measurementId });
        if (!measurement) {
            return res.sendStatus(404);
        }
        if (String(measurement.user) !== userId) {
            return res.sendStatus(403);
        }
        yield (0, measurement_service_1.deleteMeasurement)({ _id: measurementId });
        return res.sendStatus(200);
    });
}
exports.deleteMeasurementController = deleteMeasurementController;
