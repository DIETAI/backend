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
exports.deleteDietMealController = exports.getAllDietMealsController = exports.getDietMealsToRecommendController = exports.getDietMealsController = exports.getDietMealController = exports.updateDietMealController = exports.createDietMealController = void 0;
const diet_service_1 = require("../../services/diet/diet.service");
const dietDinner_service_1 = require("../../services/diet/dietDinner.service");
const dietMeal_service_1 = require("../../services/diet/dietMeal.service");
const dietEstablishment_service_1 = require("../../services/dietEstablishment.service");
const dinner_service_1 = require("../../services/dinner/dinner.service");
const dinnerPortion_service_1 = require("../../services/dinner/dinnerPortion.service");
const dinnerProduct_service_1 = require("../../services/dinner/dinnerProduct.service");
const products_service_1 = require("../../services/products.service");
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
function getDietMealsToRecommendController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const dietMeals = yield (0, dietMeal_service_1.getDietMeals)({});
        if (!dietMeals) {
            return res.sendStatus(404);
        }
        const dietMealsWithDinners = yield Promise.all(dietMeals.map((dietMeal) => __awaiter(this, void 0, void 0, function* () {
            const mealDinners = yield (0, dietDinner_service_1.getDietDinners)({ dietMealId: dietMeal._id });
            const newMealObj = {
                _id: dietMeal._id,
                userId: dietMeal.user,
                name: dietMeal.name,
                type: dietMeal.type,
                order: dietMeal.order,
                dinners: mealDinners,
            };
            return newMealObj;
        })));
        const filteredDietMealsDinners = dietMealsWithDinners.filter((dietMeal) => dietMeal.dinners.length > 0);
        return res.send(filteredDietMealsDinners);
    });
}
exports.getDietMealsToRecommendController = getDietMealsToRecommendController;
function getAllDietMealsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // const currentDietKind = req.dietKind
        const dietMeals = yield (0, dietMeal_service_1.getDietMeals)({});
        if (!dietMeals) {
            return res.sendStatus(404);
        }
        const establishments = yield (0, dietEstablishment_service_1.getDietEstablishments)({});
        const establishmentsMeals = establishments.flatMap((establishment) => establishment.meals);
        const dietMealsDinners = yield Promise.all(dietMeals.map((dietMeal) => __awaiter(this, void 0, void 0, function* () {
            const mealEstablishment = establishmentsMeals.find((mealEstablishment) => mealEstablishment._id === dietMeal.establishmentMealId);
            //sprawdzić czy rodzaj diety jest taki sam jak rodzaj obecnej diety
            const diet = yield (0, diet_service_1.getDiet)({ _id: dietMeal.dietId });
            const dietEstablishment = yield (0, dietEstablishment_service_1.getDietEstablishment)({
                _id: diet === null || diet === void 0 ? void 0 : diet.establishmentId,
            });
            // const dietKind = dietEstablishment?.dietKind === currentDietKind
            const mealDinners = yield (0, dietDinner_service_1.getDietDinners)({ dietMealId: dietMeal._id });
            const dinners = yield Promise.all(mealDinners.map((mealDinner) => __awaiter(this, void 0, void 0, function* () {
                const dinnerPortion = yield (0, dinnerPortion_service_1.getDinnerPortion)({
                    _id: mealDinner.dinnerPortionId,
                });
                if (!dinnerPortion)
                    return Object.assign({}, mealDinner);
                const dinner = yield (0, dinner_service_1.getDinner)({ _id: dinnerPortion === null || dinnerPortion === void 0 ? void 0 : dinnerPortion.dinnerId });
                const dinnerProducts = yield (0, dinnerProduct_service_1.getDinnerProducts)({
                    dinnerId: dinner === null || dinner === void 0 ? void 0 : dinner._id,
                });
                const dinnerProductsQuery = yield Promise.all(dinnerProducts.map((dinnerProduct) => __awaiter(this, void 0, void 0, function* () {
                    const product = yield (0, products_service_1.getProduct)({
                        _id: dinnerProduct.productId,
                    });
                    return Object.assign(Object.assign({}, dinnerProduct), { product });
                })));
                return Object.assign(Object.assign({}, mealDinner), { dinner, dinnerProducts: dinnerProductsQuery });
            })));
            return Object.assign(Object.assign({}, dietMeal), { dinners,
                dietEstablishment,
                mealEstablishment });
        })));
        const filteredDietMealsDinners = dietMealsDinners.filter((dietMeal) => dietMeal.dinners.length > 0);
        return res.send(dietMealsDinners);
    });
}
exports.getAllDietMealsController = getAllDietMealsController;
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
