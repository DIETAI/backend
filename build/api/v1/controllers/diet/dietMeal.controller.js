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
exports.deleteDietMealController = exports.getDietMealsController = exports.getDietMealController = exports.updateDietMealController = exports.createDietMealController = void 0;
const dietMeal_service_1 = require("../../services/diet/dietMeal.service");
function createDietMealController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const body = req.body;
        const dietMeal = yield (0, dietMeal_service_1.createDietMeal)(Object.assign(Object.assign({}, body), { user: userId }));
        if (!dietMeal) {
            return res.sendStatus(404);
        }
        return res.send(dietMeal);
    });
}
exports.createDietMealController = createDietMealController;
function updateDietMealController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dietMealId = req.params.dietMealId;
        const update = req.body;
        const dietMeal = yield (0, dietMeal_service_1.getDietMeal)({
            _id: dietMealId,
        });
        if (!dietMeal) {
            return res.sendStatus(404);
        }
        if (String(dietMeal.user) !== userId) {
            return res.sendStatus(403);
        }
        const updatedDietMeal = yield (0, dietMeal_service_1.getAndUpdateDietMeal)({ _id: dietMealId }, update, {
            new: true,
        });
        return res.send(updatedDietMeal);
    });
}
exports.updateDietMealController = updateDietMealController;
function getDietMealController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dietMealId = req.params.dietMealId;
        const dietMeal = yield (0, dietMeal_service_1.getDietMeal)({
            _id: dietMealId,
        });
        if (!dietMeal) {
            return res.sendStatus(404);
        }
        if (String(dietMeal.user) !== userId) {
            return res.sendStatus(403);
        }
        return res.send(dietMeal);
    });
}
exports.getDietMealController = getDietMealController;
function getDietMealsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dayId = req.params.dietDayId;
        const dietMeals = yield (0, dietMeal_service_1.getDietMeals)({ user: userId, dayId: dayId });
        if (!dietMeals) {
            return res.sendStatus(404);
        }
        const sortedMeals = [...dietMeals].sort((a, b) => a.order - b.order);
        return res.send(sortedMeals);
    });
}
exports.getDietMealsController = getDietMealsController;
function deleteDietMealController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dietMealId = req.params.dietMealId;
        const dietMeal = yield (0, dietMeal_service_1.getDietMeal)({
            _id: dietMealId,
        });
        if (!dietMeal) {
            return res.sendStatus(404);
        }
        if (String(dietMeal.user) !== userId) {
            return res.sendStatus(403);
        }
        yield (0, dietMeal_service_1.deleteDietMeal)({ _id: dietMealId });
        return res.sendStatus(200);
    });
}
exports.deleteDietMealController = deleteDietMealController;
