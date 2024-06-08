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
exports.deleteDietDinnerController = exports.getDietDinnersQueryController = exports.getDietDinnersByPortionIdController = exports.getDietDinnersByDayIdController = exports.getDietDinnersController = exports.getAllDietDinnersController = exports.getAllDietDinnersToMealRecommendController = exports.getDietDinnersToDinnerRecommendController = exports.getDietDinnerController = exports.updateDietDinnerController = exports.createDietDinnerController = void 0;
const dietDinner_service_1 = require("../../services/diet/dietDinner.service");
const dietMeal_service_1 = require("../../services/diet/dietMeal.service");
const diet_service_1 = require("../../services/diet/diet.service");
const dinnerPortion_service_1 = require("../../services/dinner/dinnerPortion.service");
const dinnerProduct_service_1 = require("../../services/dinner/dinnerProduct.service");
const dinner_service_1 = require("../../services/dinner/dinner.service");
const dietMeal_service_2 = require("../../services/diet/dietMeal.service");
const dietDay_service_1 = require("../../services/diet/dietDay.service");
const getTotal_1 = require("../../helpers/diet/getTotal");
function createDietDinnerController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const body = req.body;
        const dietDinner = yield (0, dietDinner_service_1.createDietDinner)(Object.assign(Object.assign({}, body), { user: userId }));
        if (!dietDinner) {
            return res.sendStatus(404);
        }
        //remove
        // dietEmitter.emit('dietDinner::created', 200, dietDinner);
        //update meal_total
        const currentMealDietDinners = yield (0, dietDinner_service_1.getDietDinnersWithTotal)({
            dietMealId: dietDinner.dietMealId,
        });
        const dinnersTotal = currentMealDietDinners.map((dietDinner) => ({
            total: dietDinner.dinnerPortionId.total,
        }));
        const mealTotalValues = yield (0, getTotal_1.getTotal)(dinnersTotal);
        const newMealTotal = Object.assign(Object.assign({}, mealTotalValues), { procent: (0, getTotal_1.getMealTotalProcent)({
                mealTotalKcal: mealTotalValues.kcal,
                dayTotalKcal: 2000,
            }) });
        const updatedMeal = yield (0, dietMeal_service_1.getAndUpdateDietMeal)({ _id: dietDinner.dietMealId }, { $set: { total: newMealTotal } }, { new: true });
        //update day total
        const currentDayMealsTotal = yield (0, dietMeal_service_2.getDietMeals)({ dayId: dietDinner.dayId }, { select: 'total' });
        const dayMealsTotal = currentDayMealsTotal.map((dayMeal) => ({
            total: dayMeal.total,
        }));
        const newDayTotal = yield (0, getTotal_1.getTotal)(dayMealsTotal);
        const updatedDay = yield (0, dietDay_service_1.getAndUpdateDietDay)({ _id: dietDinner.dayId }, { $set: { total: newDayTotal } }, { new: true });
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
        //update meal_total
        const currentMealDietDinners = yield (0, dietDinner_service_1.getDietDinnersWithTotal)({
            dietMealId: dietDinner.dietMealId,
        });
        const dinnersTotal = currentMealDietDinners.map((dietDinner) => ({
            total: dietDinner.dinnerPortionId.total,
        }));
        const mealTotalValues = yield (0, getTotal_1.getTotal)(dinnersTotal);
        const newMealTotal = Object.assign(Object.assign({}, mealTotalValues), { procent: (0, getTotal_1.getMealTotalProcent)({
                mealTotalKcal: mealTotalValues.kcal,
                dayTotalKcal: 2000,
            }) });
        const updatedMeal = yield (0, dietMeal_service_1.getAndUpdateDietMeal)({ _id: dietDinner.dietMealId }, { $set: { total: newMealTotal } }, { new: true });
        //update day total
        const currentDayMealsTotal = yield (0, dietMeal_service_2.getDietMeals)({ dayId: dietDinner.dayId }, { select: 'total' });
        const dayMealsTotal = currentDayMealsTotal.map((dayMeal) => ({
            total: dayMeal.total,
        }));
        const newDayTotal = yield (0, getTotal_1.getTotal)(dayMealsTotal);
        const updatedDay = yield (0, dietDay_service_1.getAndUpdateDietDay)({ _id: dietDinner.dayId }, { $set: { total: newDayTotal } }, { new: true });
        // dietEmitter.emit('dietDinner::created', 200, dietDinner);
        // console.log('Edytowano i wysłano posiłek: 200');
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
//aws
function getDietDinnersToDinnerRecommendController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const dietDinners = yield (0, dietDinner_service_1.getDietDinners)({});
        if (!dietDinners) {
            return res.sendStatus(404);
        }
        // const mealType = 'snack';
        // const resultDinners = [];
        // for (const dietDinner of dietDinners) {
        //   const dayMeals = await getDietMeals({ dayId: dietDinner.dayId });
        //   const searchMeal = dayMeals.find(
        //     (dayMeal) => dayMeal.type === mealType
        //   ) as IDietMealDocument;
        //   const dinners = await getDietDinners({ dietMealId: searchMeal._id });
        //   if (dinners.length > 0) {
        //     resultDinners.push(dietDinner);
        //   }
        // } //correct
        const dietDinnersToRecommend = yield Promise.all(dietDinners.map((dietDinner) => __awaiter(this, void 0, void 0, function* () {
            const dinnerPortion = (yield (0, dinnerPortion_service_1.getDinnerPortion)({
                _id: dietDinner.dinnerPortionId,
            }));
            const dinner = yield (0, dinner_service_1.getDinner)({ _id: dinnerPortion.dinnerId });
            const meal = yield (0, dietMeal_service_2.getDietMeal)({ _id: dietDinner.dietMealId });
            return {
                _id: dietDinner._id,
                mealId: dietDinner.dietMealId,
                mealType: meal === null || meal === void 0 ? void 0 : meal.type,
                dayId: dietDinner.dayId,
                dinnerId: dinner === null || dinner === void 0 ? void 0 : dinner._id,
                dinnerName: dinner === null || dinner === void 0 ? void 0 : dinner.name,
            };
        }))); //brak filtrowania (wybierz tylko te dni które zawierają potrawy w np. 2 śniadaniu )
        //panel admina
        //nie trzeba filtrować tylko wybrać potrawy getDietDinners({toGenerate: true})  => po zapisaniu dnia do generowania zmienia się na true => po usunięciu wszystkich potraw z jednego posiłku => zmienia się na false
        return res.send(dietDinnersToRecommend);
    });
}
exports.getDietDinnersToDinnerRecommendController = getDietDinnersToDinnerRecommendController;
function getAllDietDinnersToMealRecommendController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // const userId = res.locals.user._id;
        // const mealId = req.params.dietMealId;
        const dietDinners = yield (0, dietDinner_service_1.getDietDinners)({});
        if (!dietDinners) {
            return res.sendStatus(404);
        }
        const dietDinnersQuery = yield Promise.all(dietDinners.map((dietDinner) => __awaiter(this, void 0, void 0, function* () {
            const diet = yield (0, diet_service_1.getDiet)({ _id: dietDinner.dietId });
            const dinnerPortion = yield (0, dinnerPortion_service_1.getDinnerPortion)({
                _id: dietDinner.dinnerPortionId,
            });
            if (!dinnerPortion)
                return;
            const dinner = yield (0, dinner_service_1.getDinner)({ _id: dinnerPortion.dinnerId });
            const dinnerProducts = yield (0, dinnerProduct_service_1.getDinnerProducts)({ dinnerId: dinner === null || dinner === void 0 ? void 0 : dinner._id });
            const meal = yield (0, dietMeal_service_2.getDietMeal)({ _id: dietDinner.dietMealId });
            const day = yield (0, dietDay_service_1.getDietDay)({ _id: meal === null || meal === void 0 ? void 0 : meal.dayId });
            return {
                _id: dietDinner._id,
                userId: dietDinner.user,
                diet: {
                    _id: diet === null || diet === void 0 ? void 0 : diet._id,
                    name: diet === null || diet === void 0 ? void 0 : diet.name,
                    clientId: diet === null || diet === void 0 ? void 0 : diet.clientId,
                    clientPreferencesGroup: 1,
                },
                dinner: {
                    _id: dinner === null || dinner === void 0 ? void 0 : dinner._id,
                    name: dinner === null || dinner === void 0 ? void 0 : dinner.name,
                    products: dinnerProducts.map((dinnerProduct) => dinnerProduct._id),
                    likedProductsPoints: 0,
                },
                day: {
                    _id: day === null || day === void 0 ? void 0 : day._id,
                    name: day === null || day === void 0 ? void 0 : day.name,
                },
                meal: {
                    _id: meal === null || meal === void 0 ? void 0 : meal._id,
                    name: meal === null || meal === void 0 ? void 0 : meal.name,
                    type: meal === null || meal === void 0 ? void 0 : meal.type,
                },
            };
        })));
        // const sortedDinners = [...dietDinnersQuery].sort((a, b) => a.order - b.order);
        return res.send(dietDinnersQuery);
    });
}
exports.getAllDietDinnersToMealRecommendController = getAllDietDinnersToMealRecommendController;
function getAllDietDinnersController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // const userId = res.locals.user._id;
        // const mealId = req.params.dietMealId;
        const dietDinners = yield (0, dietDinner_service_1.getDietDinners)({});
        if (!dietDinners) {
            return res.sendStatus(404);
        }
        const dietDinnersQuery = yield Promise.all(dietDinners.map((dietDinner) => __awaiter(this, void 0, void 0, function* () {
            const diet = yield (0, diet_service_1.getDiet)({ _id: dietDinner.dietId });
            const dinnerPortion = yield (0, dinnerPortion_service_1.getDinnerPortion)({
                _id: dietDinner.dinnerPortionId,
            });
            if (!dinnerPortion)
                return;
            const dinner = yield (0, dinner_service_1.getDinner)({ _id: dinnerPortion.dinnerId });
            const dinnerProducts = yield (0, dinnerProduct_service_1.getDinnerProducts)({ dinnerId: dinner === null || dinner === void 0 ? void 0 : dinner._id });
            const meal = yield (0, dietMeal_service_2.getDietMeal)({ _id: dietDinner.dietMealId });
            return {
                _id: dietDinner._id,
                userId: dietDinner.user,
                diet: {
                    _id: diet === null || diet === void 0 ? void 0 : diet._id,
                    name: diet === null || diet === void 0 ? void 0 : diet.name,
                    clientId: diet === null || diet === void 0 ? void 0 : diet.clientId,
                    clientPreferencesGroup: 1,
                },
                dinner: {
                    _id: dinner === null || dinner === void 0 ? void 0 : dinner._id,
                    name: dinner === null || dinner === void 0 ? void 0 : dinner.name,
                    products: dinnerProducts.map((dinnerProduct) => dinnerProduct._id),
                    likedProductsPoints: 0,
                },
                meal: {
                    _id: meal === null || meal === void 0 ? void 0 : meal._id,
                    name: meal === null || meal === void 0 ? void 0 : meal.name,
                    type: meal === null || meal === void 0 ? void 0 : meal.type,
                },
            };
        })));
        // const sortedDinners = [...dietDinnersQuery].sort((a, b) => a.order - b.order);
        return res.send(dietDinnersQuery);
    });
}
exports.getAllDietDinnersController = getAllDietDinnersController;
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
function getDietDinnersByDayIdController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dayId = req.params.dayId;
        const dietDinners = yield (0, dietDinner_service_1.getDietDinners)({
            user: userId,
            dayId: dayId,
        });
        if (!dietDinners) {
            return res.sendStatus(404);
        }
        const dietDinnersQuery = yield Promise.all(dietDinners.map((dietDinner) => __awaiter(this, void 0, void 0, function* () {
            const diet = yield (0, diet_service_1.getDiet)({ _id: dietDinner.dietId });
            const dinnerPortion = yield (0, dinnerPortion_service_1.getDinnerPortion)({
                _id: dietDinner.dinnerPortionId,
            });
            if (!dinnerPortion)
                return Object.assign(Object.assign({}, dietDinner), { diet });
            const dinner = yield (0, dinner_service_1.getDinner)({ _id: dinnerPortion.dinnerId });
            const meal = yield (0, dietMeal_service_2.getDietMeal)({ _id: dietDinner.dietMealId });
            return Object.assign(Object.assign({}, dietDinner), { diet,
                dinner,
                meal });
        })));
        if (!dietDinnersQuery) {
            return res.sendStatus(404);
        }
        const sortedDinners = [...dietDinnersQuery].sort((a, b) => a.order - b.order);
        return res.send(sortedDinners);
    });
}
exports.getDietDinnersByDayIdController = getDietDinnersByDayIdController;
function getDietDinnersByPortionIdController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const portionId = req.params.dinnerPortionId;
        const dietDinners = yield (0, dietDinner_service_1.getDietDinners)({
            user: userId,
            dinnerPortionId: portionId,
        });
        if (!dietDinners) {
            return res.sendStatus(404);
        }
        const dietDinnersQuery = yield Promise.all(dietDinners.map((dietDinner) => __awaiter(this, void 0, void 0, function* () {
            const diet = yield (0, diet_service_1.getDiet)({ _id: dietDinner.dietId });
            return Object.assign(Object.assign({}, dietDinner), { diet });
        })));
        const sortedDinners = [...dietDinnersQuery].sort((a, b) => a.order - b.order);
        return res.send(sortedDinners);
    });
}
exports.getDietDinnersByPortionIdController = getDietDinnersByPortionIdController;
function getDietDinnersQueryController(req, res) {
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
        const dietDinnersQuery = yield Promise.all(dietDinners.map((dietDinner) => __awaiter(this, void 0, void 0, function* () {
            const dinnerPortion = yield (0, dinnerPortion_service_1.getDinnerPortion)({
                _id: dietDinner.dinnerPortionId,
            });
            return Object.assign(Object.assign({}, dietDinner), { dinnerPortion });
        })));
        const sortedDinners = [...dietDinnersQuery].sort((a, b) => a.order - b.order);
        return res.send(sortedDinners);
    });
}
exports.getDietDinnersQueryController = getDietDinnersQueryController;
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
        //update meal_total
        const currentMealDietDinners = yield (0, dietDinner_service_1.getDietDinnersWithTotal)({
            dietMealId: dietDinner.dietMealId,
        });
        const dinnersTotal = currentMealDietDinners.map((dietDinner) => ({
            total: dietDinner.dinnerPortionId.total,
        }));
        const mealTotalValues = yield (0, getTotal_1.getTotal)(dinnersTotal);
        const newMealTotal = Object.assign(Object.assign({}, mealTotalValues), { procent: (0, getTotal_1.getMealTotalProcent)({
                mealTotalKcal: mealTotalValues.kcal,
                dayTotalKcal: 2000,
            }) });
        const updatedMeal = yield (0, dietMeal_service_1.getAndUpdateDietMeal)({ _id: dietDinner.dietMealId }, { $set: { total: newMealTotal } }, { new: true });
        //update day total
        const currentDayMealsTotal = yield (0, dietMeal_service_2.getDietMeals)({ dayId: dietDinner.dayId }, { select: 'total' });
        const dayMealsTotal = currentDayMealsTotal.map((dayMeal) => ({
            total: dayMeal.total,
        }));
        const newDayTotal = yield (0, getTotal_1.getTotal)(dayMealsTotal);
        const updatedDay = yield (0, dietDay_service_1.getAndUpdateDietDay)({ _id: dietDinner.dayId }, { $set: { total: newDayTotal } }, { new: true });
        // dietEmitter.emit('dietDinner::deleted', 200, dietDinner);
        return res.sendStatus(200);
    });
}
exports.deleteDietDinnerController = deleteDietDinnerController;
