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
exports.dietEmitter = void 0;
const events_1 = require("events");
const dietDinner_service_1 = require("../../services/diet/dietDinner.service");
const dietMeal_service_1 = require("../../services/diet/dietMeal.service");
const dinnerPortion_service_1 = require("../../services/dinner/dinnerPortion.service");
const dietDay_service_1 = require("../../services/diet/dietDay.service");
const helpers_1 = require("./helpers");
const dietDay_helpers_1 = require("./dietDay.helpers");
exports.dietEmitter = new events_1.EventEmitter();
exports.dietEmitter.on('dietDinner::created', (code, dietDinner) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Got ${code} and ${dietDinner._id}`);
    const dietDinners = yield (0, dietDinner_service_1.getDietDinners)({
        dietMealId: dietDinner.dietMealId,
    });
    const dietDinnersQuery = yield Promise.all(dietDinners.map((dietDinner) => __awaiter(void 0, void 0, void 0, function* () {
        const dinnerPortion = yield (0, dinnerPortion_service_1.getDinnerPortion)({
            _id: dietDinner.dinnerPortionId,
        });
        return Object.assign(Object.assign({}, dietDinner), { dinnerPortion: dinnerPortion });
    })));
    console.log({ dietDinnersQueryPortion: dietDinnersQuery[0].dinnerPortion });
    const dietMeal = yield (0, dietMeal_service_1.getDietMeal)({
        _id: dietDinner.dietMealId,
    });
    const mealTotal = Object.assign(Object.assign({}, dietMeal), { total: (0, helpers_1.sumDietDinnersTotal)({
            dietDinners: dietDinnersQuery,
            dietDayTotalKcal: 2000,
        }) });
    try {
        const updatedMeal = yield (0, dietMeal_service_1.getAndUpdateDietMeal)({ _id: dietDinner.dietMealId }, mealTotal, {
            new: true,
        });
        exports.dietEmitter.emit('dietMeal::updated', 200, updatedMeal);
        console.log(updatedMeal);
    }
    catch (e) {
        console.log(e);
    }
    //count dinners total
})); // Register for eventOne
exports.dietEmitter.on('dietDinner::updated', (code, dietDinner) => {
    console.log(`Got ${code} and ${dietDinner._id}`);
}); // Register for eventOne
exports.dietEmitter.on('dietDinner::deleted', (code, dietDinner) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Got ${code} and ${dietDinner._id}`);
    console.log({ dietDinner });
    //mealId
    const dietDinners = yield (0, dietDinner_service_1.getDietDinners)({
        dietMealId: dietDinner.dietMealId,
    });
    console.log({ dietDinners });
    //jesli brak potraw w posiłku zmienic total na 0
    if (dietDinners.length < 1) {
        const dietMeal = yield (0, dietMeal_service_1.getDietMeal)({
            _id: dietDinner.dietMealId,
        });
        const mealTotal = Object.assign(Object.assign({}, dietMeal), { total: (0, helpers_1.sumDietDinnersTotal)({
                dietDayTotalKcal: 2000,
            }) });
        try {
            const updatedMeal = yield (0, dietMeal_service_1.getAndUpdateDietMeal)({ _id: dietDinner.dietMealId }, mealTotal, {
                new: true,
            });
            exports.dietEmitter.emit('dietMeal::updated', 200, updatedMeal);
            console.log(updatedMeal);
        }
        catch (e) {
            console.log(e);
        }
        return;
    }
    const dietDinnersQuery = yield Promise.all(dietDinners.map((dietDinner) => __awaiter(void 0, void 0, void 0, function* () {
        const dinnerPortion = yield (0, dinnerPortion_service_1.getDinnerPortion)({
            _id: dietDinner.dinnerPortionId,
        });
        return Object.assign(Object.assign({}, dietDinner), { dinnerPortion: dinnerPortion });
    })));
    console.log({ dietDinnersQueryPortion: dietDinnersQuery[0].dinnerPortion });
    const dietMeal = yield (0, dietMeal_service_1.getDietMeal)({
        _id: dietDinner.dietMealId,
    });
    const mealTotal = Object.assign(Object.assign({}, dietMeal), { total: (0, helpers_1.sumDietDinnersTotal)({
            dietDinners: dietDinnersQuery,
            dietDayTotalKcal: 2000,
        }) });
    try {
        const updatedMeal = yield (0, dietMeal_service_1.getAndUpdateDietMeal)({ _id: dietDinner.dietMealId }, mealTotal, {
            new: true,
        });
        exports.dietEmitter.emit('dietMeal::updated', 200, updatedMeal);
        console.log(updatedMeal);
    }
    catch (e) {
        console.log(e);
    }
})); // Register for eventOne
exports.dietEmitter.on('dietMeal::created', (code, dietMeal) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(dietMeal);
}));
exports.dietEmitter.on('dietMeal::updated', (code, dietMeal) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Edytowano ${dietMeal.name}`);
    const dietDayMeals = yield (0, dietMeal_service_1.getDietMeals)({
        dayId: dietMeal.dayId,
    });
    const dietDay = yield (0, dietDay_service_1.getDietDay)({
        _id: dietMeal.dayId,
    });
    const dayTotal = Object.assign(Object.assign({}, dietDay), { total: (0, dietDay_helpers_1.sumDietDayMealsTotal)({
            dietMeals: dietDayMeals,
        }) });
    try {
        const updatedDay = yield (0, dietDay_service_1.getAndUpdateDietDay)({ _id: dietDay === null || dietDay === void 0 ? void 0 : dietDay._id }, dayTotal, {
            new: true,
        });
        console.log('updated day');
        console.log(updatedDay);
    }
    catch (e) {
        console.log(e);
    }
}));
