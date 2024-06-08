"use strict";
//funkcja zliczania meal_dinners lub day_meals (może być wykorzystywana przez dietMeal, oraz dietDay);
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
exports.getTotal = exports.getMealTotalProcent = void 0;
const round2 = (value) => {
    return Math.round(value * 1e2) / 1e2;
};
const getMealTotalProcent = ({ mealTotalKcal, dayTotalKcal, }) => {
    return round2((mealTotalKcal * 100) / dayTotalKcal);
};
exports.getMealTotalProcent = getMealTotalProcent;
//items to wartości total dietDinners lub dietMeals
//przy zmianie dietMealTotal dodać jeszcze procent
//jeśli brak items (brak potraw w posiłku, to zmień wartości na 0)
const getTotal = (items) => __awaiter(void 0, void 0, void 0, function* () {
    //kcal
    const totalKcal = (items === null || items === void 0 ? void 0 : items.reduce((acc, field) => acc + Number(field.total.kcal), 0)) || 0;
    //protein
    const totalProteinGram = (items === null || items === void 0 ? void 0 : items.reduce((acc, field) => acc + Number(field.total.protein.gram), 0)) ||
        0;
    const totalProteinKcal = (items === null || items === void 0 ? void 0 : items.reduce((acc, field) => acc + Number(field.total.protein.gram), 0)) ||
        0;
    const proteinProcent = round2((totalProteinKcal * 100) / totalKcal) || 0;
    //fat
    const totalFatGram = (items === null || items === void 0 ? void 0 : items.reduce((acc, field) => acc + Number(field.total.fat.gram), 0)) || 0;
    const totalFatKcal = (items === null || items === void 0 ? void 0 : items.reduce((acc, field) => acc + Number(field.total.fat.gram), 0)) || 0;
    const fatProcent = round2((totalFatKcal * 100) / totalKcal) || 0;
    //carbohydrates
    const totalCarbohydratesGram = (items === null || items === void 0 ? void 0 : items.reduce((acc, field) => acc + Number(field.total.carbohydrates.gram), 0)) || 0;
    const totalCarbohydratesKcal = (items === null || items === void 0 ? void 0 : items.reduce((acc, field) => acc + Number(field.total.carbohydrates.gram), 0)) || 0;
    const carbohydratesProcent = round2((totalCarbohydratesKcal * 100) / totalKcal) || 0;
    //fiber
    const totalFiberGram = (items === null || items === void 0 ? void 0 : items.reduce((acc, field) => acc + Number(field.total.fiber.gram), 0)) || 0;
    const totalFiberKcal = (items === null || items === void 0 ? void 0 : items.reduce((acc, field) => acc + Number(field.total.fiber.gram), 0)) || 0;
    const totalValues = {
        kcal: totalKcal,
        protein: {
            gram: totalProteinGram,
            kcal: totalProteinKcal,
            procent: proteinProcent,
        },
        fat: {
            gram: totalFatGram,
            kcal: totalFatKcal,
            procent: fatProcent,
        },
        carbohydrates: {
            gram: totalCarbohydratesGram,
            kcal: totalCarbohydratesKcal,
            procent: carbohydratesProcent,
        },
        fiber: {
            gram: totalFiberGram,
            kcal: totalFiberKcal,
        },
    };
    return totalValues;
});
exports.getTotal = getTotal;
