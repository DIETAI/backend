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
exports.deleteDietController = exports.getDietsController = exports.getDietQueryController = exports.getDietController = exports.updateDietController = exports.createDietController = void 0;
const diet_service_1 = require("../../services/diet/diet.service");
const dietDay_service_1 = require("../../services/diet/dietDay.service");
const dietEstablishment_service_1 = require("../../services/dietEstablishment.service");
const dietMeal_service_1 = require("../../services/diet/dietMeal.service");
const dietDinner_service_1 = require("../../services/diet/dietDinner.service");
const dinner_service_1 = require("../../services/dinner/dinner.service");
const dinnerPortion_service_1 = require("../../services/dinner/dinnerPortion.service");
const dinnerProduct_service_1 = require("../../services/dinner/dinnerProduct.service");
const products_service_1 = require("../../services/products.service");
const asset_service_1 = require("../../services/asset.service");
function createDietController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const body = req.body;
        const diet = yield (0, diet_service_1.createDiet)(Object.assign(Object.assign({}, body), { user: userId }));
        if (!diet) {
            return res.sendStatus(404);
        }
        //getDietEstablishment
        const dietEstablishment = yield (0, dietEstablishment_service_1.getDietEstablishment)({
            _id: diet.establishmentId,
        });
        if (!dietEstablishment) {
            return res.sendStatus(404);
        }
        //create diet days
        // const diet_days = Array.from(Array(diet.daysAmount).keys());
        const dietDays = body.days;
        const newDietDays = yield Promise.all(dietDays.map((dietDay) => __awaiter(this, void 0, void 0, function* () {
            const newDietDay = yield (0, dietDay_service_1.createDietDay)({
                name: `Day ${dietDay.order}`,
                order: dietDay.order,
                date: dietDay.date,
                dietId: diet._id,
                user: userId,
                establishmentId: diet.establishmentId,
                total: {
                    kcal: 0,
                    protein: {
                        gram: 0,
                        kcal: 0,
                        procent: 0,
                    },
                    fat: {
                        gram: 0,
                        kcal: 0,
                        procent: 0,
                    },
                    carbohydrates: {
                        gram: 0,
                        kcal: 0,
                        procent: 0,
                    },
                    fiber: {
                        gram: 0,
                        kcal: 0,
                    },
                },
            });
            if (!newDietDay) {
                return res.sendStatus(404);
            }
            //newMeals
            const newDayMeals = yield Promise.all(dietEstablishment.meals.map((establishmentMeal, mealIndex) => __awaiter(this, void 0, void 0, function* () {
                const newDayMeal = yield (0, dietMeal_service_1.createDietMeal)({
                    name: establishmentMeal.name,
                    type: establishmentMeal.type,
                    establishmentMealId: establishmentMeal._id,
                    user: userId,
                    dietId: diet._id,
                    dayId: newDietDay._id,
                    order: mealIndex + 1,
                    total: {
                        kcal: 0,
                        procent: 0,
                        protein: {
                            gram: 0,
                            kcal: 0,
                            procent: 0,
                        },
                        fat: {
                            gram: 0,
                            kcal: 0,
                            procent: 0,
                        },
                        carbohydrates: {
                            gram: 0,
                            kcal: 0,
                            procent: 0,
                        },
                        fiber: {
                            gram: 0,
                            kcal: 0,
                        },
                    },
                });
                if (!newDayMeal) {
                    return res.sendStatus(404);
                }
            })));
            return {
                day: newDietDay,
                dayMeals: newDayMeals,
            };
        })));
        if (!newDietDays) {
            return res.sendStatus(404);
        }
        return res.send(diet);
    });
}
exports.createDietController = createDietController;
function updateDietController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dietId = req.params.dietId;
        const update = req.body;
        const diet = yield (0, diet_service_1.getDiet)({
            _id: dietId,
        });
        if (!diet) {
            return res.sendStatus(404);
        }
        if (String(diet.user) !== userId) {
            return res.sendStatus(403);
        }
        const updatedDiet = yield (0, diet_service_1.getAndUpdateDiet)({ _id: dietId }, update, {
            new: true,
        });
        return res.send(updatedDiet);
    });
}
exports.updateDietController = updateDietController;
function getDietController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dietId = req.params.dietId;
        const diet = yield (0, diet_service_1.getDiet)({
            _id: dietId,
        });
        if (!diet) {
            return res.sendStatus(404);
        }
        if (String(diet.user) !== userId) {
            return res.sendStatus(403);
        }
        return res.send(diet);
    });
}
exports.getDietController = getDietController;
function getDietQueryController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dietId = req.params.dietId;
        const diet = yield (0, diet_service_1.getDiet)({
            _id: dietId,
        });
        if (!diet) {
            return res.sendStatus(404);
        }
        if (String(diet.user) !== userId) {
            return res.sendStatus(403);
        }
        const dietDaysQ = (0, dietDay_service_1.getDietDays)({
            dietId: diet._id,
        });
        const dietEstablishmentQ = (0, dietEstablishment_service_1.getDietEstablishment)({
            _id: diet.establishmentId,
        });
        const [dietDays, dietEstablishment] = yield Promise.all([
            dietDaysQ,
            dietEstablishmentQ,
        ]);
        if (!dietDays) {
            return res.sendStatus(404);
        }
        const dietDaysQuery = yield Promise.all(dietDays.map((dietDay) => __awaiter(this, void 0, void 0, function* () {
            const dietMealsData = yield (0, dietMeal_service_1.getDietMeals)({
                dayId: dietDay._id,
            });
            const meals = yield Promise.all(dietMealsData.map((dietMeal) => __awaiter(this, void 0, void 0, function* () {
                const dietDinnersData = yield (0, dietDinner_service_1.getDietDinners)({
                    dietMealId: dietMeal._id,
                });
                const dinners = yield Promise.all(dietDinnersData.map((dietDinner) => __awaiter(this, void 0, void 0, function* () {
                    const dinnerPortion = yield (0, dinnerPortion_service_1.getDinnerPortion)({
                        _id: dietDinner.dinnerPortionId,
                    });
                    if (!dinnerPortion)
                        return;
                    const dinner = yield (0, dinner_service_1.getDinner)({ _id: dinnerPortion.dinnerId });
                    const dinnerImageObj = (dinner === null || dinner === void 0 ? void 0 : dinner.image)
                        ? yield (0, asset_service_1.getAsset)({ _id: dinner.image })
                        : undefined;
                    const dinnerProducts = yield Promise.all(dinnerPortion.dinnerProducts.map((dietDinnerProduct) => __awaiter(this, void 0, void 0, function* () {
                        const dinnerProduct = yield (0, dinnerProduct_service_1.getDinnerProduct)({
                            _id: dietDinnerProduct.dinnerProductId,
                        });
                        const product = yield (0, products_service_1.getProduct)({
                            _id: dinnerProduct === null || dinnerProduct === void 0 ? void 0 : dinnerProduct.productId,
                        });
                        return Object.assign(Object.assign({}, dietDinnerProduct), { dinnerProduct: Object.assign(Object.assign({}, dinnerProduct), { product }) });
                    })));
                    const dinnerObj = Object.assign(Object.assign({}, dinnerPortion), { dinnerProducts, dinner: Object.assign(Object.assign({}, dinner), { imageObj: dinnerImageObj }) });
                    return Object.assign(Object.assign({}, dietDinner), { dinnerPortion: dinnerObj });
                })));
                // if (!dinners) {
                //   return {
                //     ...dietMeal,
                //     dinners: [],
                //   };
                // }
                const mealObj = Object.assign(Object.assign({}, dietMeal), { dinners: [...dinners].sort((a, b) => a.order - b.order) });
                return mealObj;
            })));
            return Object.assign(Object.assign({}, dietDay), { meals: [...meals].sort((a, b) => a.order - b.order) });
        })));
        const dietQueryObj = Object.assign(Object.assign({}, diet), { establishment: dietEstablishment, days: [...dietDaysQuery].sort((a, b) => a.order - b.order) });
        return res.send(dietQueryObj);
    });
}
exports.getDietQueryController = getDietQueryController;
function getDietsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const diets = yield (0, diet_service_1.getDiets)({ user: userId });
        if (!diets) {
            return res.sendStatus(404);
        }
        return res.send(diets);
    });
}
exports.getDietsController = getDietsController;
function deleteDietController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dietId = req.params.dietId;
        const dietObj = (0, diet_service_1.getDiet)({
            _id: dietId,
        });
        const dietDays = (0, dietDay_service_1.getDietDays)({
            dietId: dietId,
        });
        const dietMeals = (0, dietMeal_service_1.getDietMeals)({
            dietId: dietId,
        });
        const dietDinners = (0, dietDinner_service_1.getDietDinners)({
            dietId: dietId,
        });
        const [diet, days, meals, dinners] = yield Promise.all([
            dietObj,
            dietDays,
            dietMeals,
            dietDinners,
        ]);
        if (!diet) {
            return res.sendStatus(404);
        }
        if (String(diet.user) !== userId) {
            return res.sendStatus(403);
        }
        const deleteDays = yield Promise.all(days.map((dietDay) => __awaiter(this, void 0, void 0, function* () {
            yield (0, diet_service_1.deleteDiet)({ _id: dietId });
            const deleteDay = yield (0, dietDay_service_1.deleteDietDay)({ dietId: dietId });
            const deleteMeals = yield Promise.all(meals.map((dietMeal) => __awaiter(this, void 0, void 0, function* () {
                const deleteMeal = yield (0, dietMeal_service_1.deleteDietMeal)({ dietId: dietId });
                const deleteDinners = yield Promise.all(dinners.map((dietDinner) => __awaiter(this, void 0, void 0, function* () {
                    const deleteDinner = yield (0, dietDinner_service_1.deleteDietDinner)({ dietId: dietId });
                })));
            })));
        })));
        return res.sendStatus(200);
    });
}
exports.deleteDietController = deleteDietController;
