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
exports.deleteDietDinnerController = exports.getDietDinnersController = exports.getDietDinnerController = exports.updateDietDinnerController = exports.createDietDinnerController = void 0;
const dietDinner_service_1 = require("../../services/diet/dietDinner.service");
function createDietDinnerController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const body = req.body;
        const dietDinner = yield (0, dietDinner_service_1.createDietDinner)(Object.assign(Object.assign({}, body), { user: userId }));
        if (!dietDinner) {
            return res.sendStatus(404);
        }
        return res.send(dietDinner);
    });
}
exports.createDietDinnerController = createDietDinnerController;
function updateDietDinnerController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dietDinnerId = req.params.dietDinnerId;
        const update = req.body;
        const dietDinner = yield (0, dietDinner_service_1.getDietDinner)({
            _id: dietDinnerId,
        });
        if (!dietDinner) {
            return res.sendStatus(404);
        }
        if (String(dietDinner.user) !== userId) {
            return res.sendStatus(403);
        }
        const updatedDietDinner = yield (0, dietDinner_service_1.getAndUpdateDietDinner)({ _id: dietDinnerId }, update, {
            new: true,
        });
        return res.send(updatedDietDinner);
    });
}
exports.updateDietDinnerController = updateDietDinnerController;
function getDietDinnerController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dietDinnerId = req.params.dietDinnerId;
        const dietDinner = yield (0, dietDinner_service_1.getDietDinner)({
            _id: dietDinnerId,
        });
        if (!dietDinner) {
            return res.sendStatus(404);
        }
        if (String(dietDinner.user) !== userId) {
            return res.sendStatus(403);
        }
        return res.send(dietDinner);
    });
}
exports.getDietDinnerController = getDietDinnerController;
function getDietDinnersController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const mealId = req.params.dietMealId;
        const dietDinners = yield (0, dietDinner_service_1.getDietDinners)({
            user: userId,
            dietMealId: mealId,
        });
        if (!dietDinners) {
            return res.sendStatus(404);
        }
        const sortedDinners = [...dietDinners].sort((a, b) => a.order - b.order);
        return res.send(sortedDinners);
    });
}
exports.getDietDinnersController = getDietDinnersController;
function deleteDietDinnerController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dietDinnerId = req.params.dietDinnerId;
        const dietDinner = yield (0, dietDinner_service_1.getDietDinner)({
            _id: dietDinnerId,
        });
        if (!dietDinner) {
            return res.sendStatus(404);
        }
        if (String(dietDinner.user) !== userId) {
            return res.sendStatus(403);
        }
        yield (0, dietDinner_service_1.deleteDietDinner)({ _id: dietDinnerId });
        return res.sendStatus(200);
    });
}
exports.deleteDietDinnerController = deleteDietDinnerController;
