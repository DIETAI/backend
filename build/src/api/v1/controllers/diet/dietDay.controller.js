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
exports.deleteDietDayController = exports.getDietDaysController = exports.getDietDayController = exports.updateDietDayController = exports.createDietDayController = void 0;
const dietDay_service_1 = require("../../services/diet/dietDay.service");
function createDietDayController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const body = req.body;
        const dietDay = yield (0, dietDay_service_1.createDietDay)(Object.assign(Object.assign({}, body), { user: userId }));
        if (!dietDay) {
            return res.sendStatus(404);
        }
        return res.send(dietDay);
    });
}
exports.createDietDayController = createDietDayController;
function updateDietDayController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dietDayId = req.params.dietDayId;
        const update = req.body;
        const dietDay = yield (0, dietDay_service_1.getDietDay)({
            _id: dietDayId,
        });
        if (!dietDay) {
            return res.sendStatus(404);
        }
        if (String(dietDay.user) !== userId) {
            return res.sendStatus(403);
        }
        const updatedDietDay = yield (0, dietDay_service_1.getAndUpdateDietDay)({ _id: dietDayId }, update, {
            new: true,
        });
        return res.send(updatedDietDay);
    });
}
exports.updateDietDayController = updateDietDayController;
function getDietDayController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dietDayId = req.params.dietDayId;
        const dietDay = yield (0, dietDay_service_1.getDietDay)({
            _id: dietDayId,
        });
        if (!dietDay) {
            return res.sendStatus(404);
        }
        if (String(dietDay.user) !== userId) {
            return res.sendStatus(403);
        }
        return res.send(dietDay);
    });
}
exports.getDietDayController = getDietDayController;
function getDietDaysController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dietId = req.params.dietId;
        const dietDays = yield (0, dietDay_service_1.getDietDays)({ user: userId, dietId: dietId });
        if (!dietDays) {
            return res.sendStatus(404);
        }
        const sortedDays = [...dietDays].sort((a, b) => a.order - b.order);
        return res.send(sortedDays);
    });
}
exports.getDietDaysController = getDietDaysController;
function deleteDietDayController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dietDayId = req.params.dietDayId;
        const dietDay = yield (0, dietDay_service_1.getDietDay)({
            _id: dietDayId,
        });
        if (!dietDay) {
            return res.sendStatus(404);
        }
        if (String(dietDay.user) !== userId) {
            return res.sendStatus(403);
        }
        yield (0, dietDay_service_1.deleteDietDay)({ _id: dietDayId });
        return res.sendStatus(200);
    });
}
exports.deleteDietDayController = deleteDietDayController;
