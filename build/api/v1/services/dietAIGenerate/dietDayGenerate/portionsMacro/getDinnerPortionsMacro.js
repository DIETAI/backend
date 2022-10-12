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
exports.countMacroPortion = exports.getMealDinnersPortionsMacro = void 0;
const dinnerPortion_service_1 = require("../../../dinner/dinnerPortion.service");
const dinnerProduct_service_1 = require("../../../dinner/dinnerProduct.service");
const products_service_1 = require("../../../products.service");
const getMealDinnersPortionsMacro = (recommendMealDietDinner) => __awaiter(void 0, void 0, void 0, function* () {
    const dinnerPortion = (yield (0, dinnerPortion_service_1.getDinnerPortion)({
        _id: recommendMealDietDinner.dinnerPortionId,
    }));
    const dinnerProducts = (yield (0, dinnerProduct_service_1.getDinnerProducts)({
        dinnerId: dinnerPortion.dinnerId,
    }));
    //correct
    const dinnerProductsPortions = yield Promise.all(dinnerProducts.map(({ dinnerId, defaultAmount, portionsGram, _id, productId }) => __awaiter(void 0, void 0, void 0, function* () {
        const product = (yield (0, products_service_1.getProduct)({
            _id: productId,
        }));
        const macroForPortions = portionsGram.map((portionGram) => {
            const portionMacro = (0, exports.countMacroPortion)(portionGram, product);
            return portionMacro;
        });
        return macroForPortions.map((macroPortion) => (Object.assign(Object.assign({}, macroPortion), { dinnerId,
            product, dinnerProductId: _id, dietDinnerId: recommendMealDietDinner._id })));
    })));
    const randomDinnerWithPortions = Object.assign(Object.assign({}, recommendMealDietDinner), { dinnerProductsPortions });
    return randomDinnerWithPortions;
});
exports.getMealDinnersPortionsMacro = getMealDinnersPortionsMacro;
const countMacroPortion = (portion, productObj) => {
    const portionProteinGram = (portion * productObj.protein.gram) / 100;
    const portionProteinKcal = portionProteinGram * 4;
    const portionFatGram = (portion * productObj.fat.gram) / 100;
    const portionFatKcal = portionFatGram * 9;
    const portionCarbohydratesGram = (portion * productObj.carbohydrates.gram) / 100;
    const portionCarbohydratesKcal = portionCarbohydratesGram * 4;
    const portionFiberGram = (portion * productObj.fiber.gram) / 100;
    const portionFiberKcal = portionFiberGram * 2;
    const portionDisgestibleCarbohydratesGram = portionCarbohydratesGram - portionFiberGram;
    const portionDisgestibleCarbohydratesKcal = portionDisgestibleCarbohydratesGram * 4;
    const portionKcal = portionProteinKcal + portionFatKcal + portionCarbohydratesKcal;
    return {
        productId: productObj._id,
        productName: productObj.name,
        portion,
        portionKcal: roundMacro(portionKcal),
        portionProteinGram: roundMacro(portionProteinGram),
        portionProteinKcal: roundMacro(portionProteinKcal),
        portionFatGram: roundMacro(portionFatGram),
        portionFatKcal: roundMacro(portionFatKcal),
        portionCarbohydratesGram: roundMacro(portionCarbohydratesGram),
        portionCarbohydratesKcal: roundMacro(portionCarbohydratesKcal),
        portionFiberGram: roundMacro(portionFiberGram),
        portionFiberKcal: roundMacro(portionFiberKcal),
        portionDisgestibleCarbohydratesGram: roundMacro(portionDisgestibleCarbohydratesGram),
        portionDisgestibleCarbohydratesKcal: roundMacro(portionDisgestibleCarbohydratesKcal),
    };
};
exports.countMacroPortion = countMacroPortion;
const roundMacro = (macro) => {
    return Math.round(macro * 1e2) / 1e2;
};
