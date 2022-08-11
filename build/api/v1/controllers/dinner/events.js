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
exports.dinnerEmitter = void 0;
const events_1 = require("events");
const events_2 = require("../diet/events");
//services
const dietDinner_service_1 = require("../../services/diet/dietDinner.service");
const dinnerPortion_service_1 = require("../../services/dinner/dinnerPortion.service");
const dietMeal_service_1 = require("../../services/diet/dietMeal.service");
const dinnerProduct_service_1 = require("../../services/dinner/dinnerProduct.service");
const products_service_1 = require("../../services/products.service");
//helpers
const helpers_1 = require("../diet/helpers");
const countTotal_1 = require("../../helpers/countTotal");
const sumTotal_1 = require("../../helpers/sumTotal");
const dietMeal_service_2 = require("../../services/diet/dietMeal.service");
exports.dinnerEmitter = new events_1.EventEmitter();
exports.dinnerEmitter.on('dinnerProduct:create', (dinnerProduct, userId) => __awaiter(void 0, void 0, void 0, function* () {
    //if dietDinners includes dinnerPortionId => deleteDietDinner => change mealMacro, dayMacro, dietMacro
    console.log({ dinnerProduct });
    const dinnerProductQuery = yield (0, products_service_1.getProduct)({
        _id: dinnerProduct.productId,
    });
    if (!dinnerProductQuery)
        return;
    //getDinnerPortions
    const dinnerPortions = (0, dinnerPortion_service_1.getDinnerPortions)({
        dinnerId: dinnerProduct.dinnerId,
    });
    const dinnerProducts = (0, dinnerProduct_service_1.getDinnerProducts)({
        dinnerId: dinnerProduct.dinnerId,
    });
    const [portions, products] = yield Promise.all([
        dinnerPortions,
        dinnerProducts,
    ]);
    const dinnerProductsQuery = yield Promise.all(products.map((dinnerProduct) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield (0, products_service_1.getProduct)({ _id: dinnerProduct.productId });
        return Object.assign(Object.assign({}, dinnerProduct), { product });
    })));
    if (portions.length < 1) {
        //stworzyć model product portion {portion: 100, type: default}?
        const portionDinnerProducts = dinnerProductsQuery.map((dinnerProduct) => ({
            dinnerProductId: dinnerProduct._id,
            portion: dinnerProduct.defaultAmount,
            total: (0, countTotal_1.countTotal)({
                product: dinnerProduct.product,
                portion: dinnerProduct.defaultAmount,
            }),
        }));
        const total = (0, sumTotal_1.sumTotal)({ dinnerPortionProducts: portionDinnerProducts });
        const newDinnerPortionObj = {
            user: userId,
            type: 'default',
            dinnerId: dinnerProduct.dinnerId,
            total,
            dinnerProducts: portionDinnerProducts,
        };
        const newDinnerPortion = yield (0, dinnerPortion_service_1.createDinnerPortion)(Object.assign({}, newDinnerPortionObj));
        return;
    }
    if (portions.length > 0) {
        const newDinnerPortionProductObj = {
            dinnerProductId: dinnerProduct._id,
            portion: dinnerProduct.defaultAmount,
            total: (0, countTotal_1.countTotal)({
                product: dinnerProductQuery,
                portion: dinnerProduct.defaultAmount,
            }),
        };
        const newPortions = yield Promise.all(portions.map((dinnerPortion) => __awaiter(void 0, void 0, void 0, function* () {
            const newDinerProducts = [
                ...dinnerPortion.dinnerProducts,
                newDinnerPortionProductObj,
            ];
            const editPortionObj = Object.assign(Object.assign({}, dinnerPortion), { total: (0, sumTotal_1.sumTotal)({ dinnerPortionProducts: newDinerProducts }), dinnerProducts: newDinerProducts });
            const updatedPortion = yield (0, dinnerPortion_service_1.getAndUpdateDinnerPortion)({ _id: dinnerPortion._id }, editPortionObj, { new: true });
            console.log({ updatedPortion });
        })));
        //jesli dietDinners include updatedPortion => change dietDinner => change dietMeal
        //change dietTotal
        // dinnerEmitter.emit('dinnerPortion:update', dinnerProduct, userId);
    }
}));
exports.dinnerEmitter.on('dinnerPortion:update', (updatedDinnerPortionId) => __awaiter(void 0, void 0, void 0, function* () {
    //if dietDinners includes dinnerPortionId => deleteDietDinner => change mealMacro, dayMacro, dietMacro
    const dietDinners = yield (0, dietDinner_service_1.getDietDinners)({
        dinnerPortionId: updatedDinnerPortionId,
    });
    if (dietDinners.length < 1) {
        return;
    }
    console.log({ dietDinners });
    const dietDinnersQuery = yield Promise.all(dietDinners.map((dietDinner) => __awaiter(void 0, void 0, void 0, function* () {
        const dinnerPortion = yield (0, dinnerPortion_service_1.getDinnerPortion)({
            _id: dietDinner.dinnerPortionId,
        });
        return Object.assign(Object.assign({}, dietDinner), { dinnerPortion: dinnerPortion });
    })));
    const dietMeals = dietDinners.map((dietDinner) => dietDinner.dietMealId);
    const uniqueDietMeals = [...new Set(dietMeals)];
    const updatedMeals = yield Promise.all(uniqueDietMeals.map((dietMealId) => __awaiter(void 0, void 0, void 0, function* () {
        const dietMeal = yield (0, dietMeal_service_2.getDietMeal)({
            _id: dietMealId,
        });
        const mealDietDinners = dietDinnersQuery.filter((dinnerQuery) => dinnerQuery.dietMealId === dietMealId);
        const mealTotal = Object.assign(Object.assign({}, dietMeal), { total: (0, helpers_1.sumDietDinnersTotal)({
                dietDinners: mealDietDinners,
                dietDayTotalKcal: 2000,
            }) });
        try {
            const updatedMeal = yield (0, dietMeal_service_1.getAndUpdateDietMeal)({ _id: dietMealId }, mealTotal, {
                new: true,
            });
            events_2.dietEmitter.emit('dietMeal::updated', 200, updatedMeal);
            console.log(updatedMeal);
        }
        catch (e) {
            console.log(e);
        }
    })));
}));
exports.dinnerEmitter.on('dinnerPortion:delete', (dinnerPortionId) => __awaiter(void 0, void 0, void 0, function* () {
    //if dietDinners includes dinnerPortionId => deleteDietDinner => change mealMacro, dayMacro, dietMacro
    const dietDinners = yield (0, dietDinner_service_1.getDietDinners)({
        dinnerPortionId: dinnerPortionId,
    });
    if (dietDinners.length < 1) {
        return;
    }
    console.log({ dietDinners });
    const deleteDietDinners = yield Promise.all(dietDinners.map((dietDinner) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, dietDinner_service_1.deleteDietDinner)({ _id: dietDinner._id });
        events_2.dietEmitter.emit('dietDinner::deleted', 200, dietDinner);
        //po usunięcu akcja dietDinners::deleted(dietDinnerId)
        //brak możliwości edytowania porcji
    })));
    //   const dietDinnersMealId = dietDinners.map((dietDinner) =>
    //     dietDinner._id.toString()
    //   );
    //   const uniqueMealsId = [...new Set(dietDinnersMealId)]; //remove duplicates
    //poprawić zliczanie total
    //   const updateDietMealsTotal = await Promise.all(
    //     uniqueMealsId.map(async (mealId) => {
    //       //edit dietDinnerMealIdTotal, dietDinnerDayIdTotal
    //       const dietMeal = await getDietMeal({
    //         _id: mealId,
    //       });
    //       const dietDinners = await getDietDinners({
    //         dietMealId: mealId,
    //       });
    //       const dietDinnersQuery = await Promise.all(
    //         dietDinners.map(async (dietDinner) => {
    //           const dinnerPortion = await getDinnerPortion({
    //             _id: dietDinner.dinnerPortionId,
    //           });
    //           return {
    //             ...dietDinner,
    //             dinnerPortion: dinnerPortion,
    //           };
    //         })
    //       );
    //       const mealTotal = {
    //         ...dietMeal,
    //         total: sumDietDinnersTotal({
    //           dietDinners: dietDinnersQuery as any,
    //           dietDayTotalKcal: 2000,
    //         }),
    //       };
    //     })
    //   );
}));
