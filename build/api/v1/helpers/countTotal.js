"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countTotal = void 0;
const countNutrient = ({ nutrientAmount, portion }) => {
    const nutrientValue = (nutrientAmount * portion) / 100;
    return Math.round(nutrientValue * 1e2) / 1e2;
};
const countTotal = ({ product, portion }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    const countValuesObj = {
        //macrohydrates
        protein: {
            gram: countNutrient({
                nutrientAmount: product.protein.gram,
                portion,
            }),
            kcal: countNutrient({
                nutrientAmount: product.protein.kcal,
                portion,
            }),
        },
        fat: {
            gram: countNutrient({
                nutrientAmount: product.fat.gram,
                portion,
            }),
            kcal: countNutrient({
                nutrientAmount: product.fat.kcal,
                portion,
            }),
        },
        carbohydrates: {
            gram: countNutrient({
                nutrientAmount: product.carbohydrates.gram,
                portion,
            }),
            kcal: countNutrient({
                nutrientAmount: product.carbohydrates.kcal,
                portion,
            }),
        },
        digestableCarbohydrates: {
            gram: countNutrient({
                nutrientAmount: product.digestableCarbohydrates.gram,
                portion,
            }),
            kcal: countNutrient({
                nutrientAmount: product.digestableCarbohydrates.kcal,
                portion,
            }),
        },
        fiber: {
            gram: countNutrient({
                nutrientAmount: product.fiber.gram,
                portion,
            }),
            kcal: countNutrient({
                nutrientAmount: product.fiber.kcal,
                portion,
            }),
        },
        //   animalProtein?: IMacrohydrate;
        //   vegetableProtein?: IMacrohydrate;
        carbohydrateExchangers: 5,
        proteinFatExchangers: 5,
        kcal: countNutrient({
            nutrientAmount: product.kcal,
            portion,
        }),
        //fattyAcids
        saturatedFattyAcids: product.saturatedFattyAcids &&
            countNutrient({
                nutrientAmount: product.saturatedFattyAcids,
                portion,
            }),
        pollyunsaturatedFattyAcids: product.pollyunsaturatedFattyAcids &&
            countNutrient({
                nutrientAmount: product.pollyunsaturatedFattyAcids,
                portion,
            }),
        pollyunsaturatedFattyAcidsOmega3: product.pollyunsaturatedFattyAcidsOmega3 &&
            countNutrient({
                nutrientAmount: product.pollyunsaturatedFattyAcidsOmega3,
                portion,
            }),
        pollyunsaturatedFattyAcidsOmega6: product.pollyunsaturatedFattyAcidsOmega6 &&
            countNutrient({
                nutrientAmount: product.pollyunsaturatedFattyAcidsOmega6,
                portion,
            }),
        monounsaturatedFattyAcids: product.monounsaturatedFattyAcids &&
            countNutrient({
                nutrientAmount: product.monounsaturatedFattyAcids,
                portion,
            }),
        //vitamins
        vitaminA: {
            amount: ((_a = product.vitaminA) === null || _a === void 0 ? void 0 : _a.amount) &&
                countNutrient({
                    nutrientAmount: product.vitaminA.amount,
                    portion,
                }),
        },
        vitaminB1: {
            amount: ((_b = product.vitaminB1) === null || _b === void 0 ? void 0 : _b.amount) &&
                countNutrient({
                    nutrientAmount: product.vitaminB1.amount,
                    portion,
                }),
        },
        vitaminB2: {
            amount: ((_c = product.vitaminB2) === null || _c === void 0 ? void 0 : _c.amount) &&
                countNutrient({
                    nutrientAmount: product.vitaminB2.amount,
                    portion,
                }),
        },
        vitaminB5: {
            amount: ((_d = product.vitaminB5) === null || _d === void 0 ? void 0 : _d.amount) &&
                countNutrient({
                    nutrientAmount: product.vitaminB5.amount,
                    portion,
                }),
        },
        vitaminB6: {
            amount: ((_e = product.vitaminB6) === null || _e === void 0 ? void 0 : _e.amount) &&
                countNutrient({
                    nutrientAmount: product.vitaminB6.amount,
                    portion,
                }),
        },
        vitaminB12: {
            amount: ((_f = product.vitaminB12) === null || _f === void 0 ? void 0 : _f.amount) &&
                countNutrient({
                    nutrientAmount: product.vitaminB12.amount,
                    portion,
                }),
        },
        biotin: {
            amount: ((_g = product.biotin) === null || _g === void 0 ? void 0 : _g.amount) &&
                countNutrient({
                    nutrientAmount: product.biotin.amount,
                    portion,
                }),
        },
        folicAcid: {
            amount: ((_h = product.folicAcid) === null || _h === void 0 ? void 0 : _h.amount) &&
                countNutrient({
                    nutrientAmount: product.folicAcid.amount,
                    portion,
                }),
        },
        vitaminC: {
            amount: ((_j = product.vitaminC) === null || _j === void 0 ? void 0 : _j.amount) &&
                countNutrient({
                    nutrientAmount: product.vitaminC.amount,
                    portion,
                }),
        },
        vitaminD: {
            amount: ((_k = product.vitaminD) === null || _k === void 0 ? void 0 : _k.amount) &&
                countNutrient({
                    nutrientAmount: product.vitaminD.amount,
                    portion,
                }),
        },
        vitaminE: {
            amount: ((_l = product.vitaminE) === null || _l === void 0 ? void 0 : _l.amount) &&
                countNutrient({
                    nutrientAmount: product.vitaminE.amount,
                    portion,
                }),
        },
        vitaminPP: {
            amount: ((_m = product.vitaminPP) === null || _m === void 0 ? void 0 : _m.amount) &&
                countNutrient({
                    nutrientAmount: product.vitaminPP.amount,
                    portion,
                }),
        },
        vitaminK: {
            amount: ((_o = product.vitaminK) === null || _o === void 0 ? void 0 : _o.amount) &&
                countNutrient({
                    nutrientAmount: product.vitaminK.amount,
                    portion,
                }),
        },
        //minerals
        zinc: {
            amount: ((_p = product.zinc) === null || _p === void 0 ? void 0 : _p.amount) &&
                countNutrient({
                    nutrientAmount: product.zinc.amount,
                    portion,
                }),
        },
        phosphorus: {
            amount: ((_q = product.phosphorus) === null || _q === void 0 ? void 0 : _q.amount) &&
                countNutrient({
                    nutrientAmount: product.phosphorus.amount,
                    portion,
                }),
        },
        magnesium: {
            amount: ((_r = product.magnesium) === null || _r === void 0 ? void 0 : _r.amount) &&
                countNutrient({
                    nutrientAmount: product.magnesium.amount,
                    portion,
                }),
        },
        copper: {
            amount: ((_s = product.copper) === null || _s === void 0 ? void 0 : _s.amount) &&
                countNutrient({
                    nutrientAmount: product.copper.amount,
                    portion,
                }),
        },
        potassium: {
            amount: ((_t = product.potassium) === null || _t === void 0 ? void 0 : _t.amount) &&
                countNutrient({
                    nutrientAmount: product.potassium.amount,
                    portion,
                }),
        },
        selenium: {
            amount: ((_u = product.selenium) === null || _u === void 0 ? void 0 : _u.amount) &&
                countNutrient({
                    nutrientAmount: product.selenium.amount,
                    portion,
                }),
        },
        sodium: {
            amount: ((_v = product.sodium) === null || _v === void 0 ? void 0 : _v.amount) &&
                countNutrient({
                    nutrientAmount: product.sodium.amount,
                    portion,
                }),
        },
        calcium: {
            amount: ((_w = product.calcium) === null || _w === void 0 ? void 0 : _w.amount) &&
                countNutrient({
                    nutrientAmount: product.calcium.amount,
                    portion,
                }),
        },
        iron: {
            amount: ((_x = product.iron) === null || _x === void 0 ? void 0 : _x.amount) &&
                countNutrient({
                    nutrientAmount: product.iron.amount,
                    portion,
                }),
        },
    };
    return countValuesObj;
};
exports.countTotal = countTotal;
