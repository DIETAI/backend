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
exports.countMacroPortion = exports.getDinnerPortionsMacro = void 0;
const dinnerProduct_service_1 = require("../../../dinner/dinnerProduct.service");
const products_service_1 = require("../../../products.service");
const getDinnerPortionsMacro = (dinnerId) => __awaiter(void 0, void 0, void 0, function* () {
    const dinnerProducts = yield (0, dinnerProduct_service_1.getDinnerProducts)({
        dinnerId: dinnerId,
    });
    const dinnerProductsPortions = yield Promise.all(dinnerProducts.map(({ dinnerId, defaultAmount, portionsGram, productId, _id }) => __awaiter(void 0, void 0, void 0, function* () {
        const product = (yield (0, products_service_1.getProduct)({
            _id: productId,
        }));
        //getProduct by productId aby obliczyć makro dla każdej porcji
        const macroForPortions = portionsGram.map((portionGram) => {
            const portionMacro = (0, exports.countMacroPortion)(portionGram, product);
            return portionMacro;
        });
        return macroForPortions.map((macroPortion) => (Object.assign(Object.assign({}, macroPortion), { dinnerId,
            product, dinnerProductId: _id })));
    })));
    return dinnerProductsPortions;
});
exports.getDinnerPortionsMacro = getDinnerPortionsMacro;
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
