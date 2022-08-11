"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sumDietDinnersTotal = void 0;
const roundValue = (value) => {
    return Math.round(value * 1e2) / 1e2;
};
const sumDietDinnersTotal = ({ dietDinners, dietDayTotalKcal, }) => {
    const kcal = roundValue((dietDinners === null || dietDinners === void 0 ? void 0 : dietDinners.reduce((acc, field) => acc + Number(field.dinnerPortion.total.kcal), 0)) || 0);
    //protein
    const proteinGram = roundValue((dietDinners === null || dietDinners === void 0 ? void 0 : dietDinners.reduce((acc, field) => acc + Number(field.dinnerPortion.total.protein.gram), 0)) || 0);
    const proteinKcal = roundValue((dietDinners === null || dietDinners === void 0 ? void 0 : dietDinners.reduce((acc, field) => acc + Number(field.dinnerPortion.total.protein.kcal), 0)) || 0);
    const proteinProcent = roundValue((proteinKcal * 100) / kcal) || 0;
    //fat
    const fatGram = roundValue((dietDinners === null || dietDinners === void 0 ? void 0 : dietDinners.reduce((acc, field) => acc + Number(field.dinnerPortion.total.fat.gram), 0)) || 0);
    const fatKcal = roundValue((dietDinners === null || dietDinners === void 0 ? void 0 : dietDinners.reduce((acc, field) => acc + Number(field.dinnerPortion.total.fat.kcal), 0)) || 0);
    const fatProcent = roundValue((fatKcal * 100) / kcal) || 0;
    //carbohydrates
    const carbohydratesGram = roundValue((dietDinners === null || dietDinners === void 0 ? void 0 : dietDinners.reduce((acc, field) => acc + Number(field.dinnerPortion.total.carbohydrates.gram), 0)) || 0);
    const carbohydratesKcal = roundValue((dietDinners === null || dietDinners === void 0 ? void 0 : dietDinners.reduce((acc, field) => acc + Number(field.dinnerPortion.total.carbohydrates.kcal), 0)) || 0);
    const carbohydratesProcent = roundValue((carbohydratesKcal * 100) / kcal) || 0;
    //fiber
    const fiberGram = roundValue((dietDinners === null || dietDinners === void 0 ? void 0 : dietDinners.reduce((acc, field) => acc + Number(field.dinnerPortion.total.fiber.gram), 0)) || 0);
    const fiberKcal = roundValue((dietDinners === null || dietDinners === void 0 ? void 0 : dietDinners.reduce((acc, field) => acc + Number(field.dinnerPortion.total.fiber.kcal), 0)) || 0);
    const mealTotal = {
        kcal,
        procent: roundValue((kcal * 100) / dietDayTotalKcal) || 0,
        protein: {
            gram: proteinGram,
            kcal: proteinKcal,
            procent: proteinProcent,
        },
        fat: {
            gram: fatGram,
            kcal: fatKcal,
            procent: fatProcent,
        },
        carbohydrates: {
            gram: carbohydratesGram,
            kcal: carbohydratesKcal,
            procent: carbohydratesProcent,
        },
        fiber: {
            gram: fiberGram,
            kcal: fiberKcal,
        },
    };
    return mealTotal;
};
exports.sumDietDinnersTotal = sumDietDinnersTotal;
