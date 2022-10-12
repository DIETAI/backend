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
exports.dietDayGenerate = void 0;
const metrics_1 = require("../../../utils/metrics");
const dietMeal_service_1 = require("../../diet/dietMeal.service");
//functions
const mealGenerate_1 = require("./mealGenerate");
const dietDinner_service_1 = require("../../diet/dietDinner.service");
const dietDayGenerate = ({ currentDayId, mealsToGenerate, generateMealsSettings, }) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('start generowania dnia');
    const metricsLabels = {
        operation: 'dayGenerate',
    };
    const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
    const generatedAllDayMeals = [];
    try {
        const addedDayMeals = yield (0, dietMeal_service_1.getDietMeals)({ dayId: currentDayId });
        //z dodanych posiłków do dnia wybranie tylko tych które zaznaczono do wygenerowania
        const checkMeals = [];
        for (let mealIndex = 0, length = addedDayMeals.length; mealIndex < length; mealIndex++) {
            const dayMeal = addedDayMeals[mealIndex];
            const checkMealInGenerate = mealsToGenerate.find((mealType) => mealType.type === dayMeal.type);
            if (checkMealInGenerate) {
                checkMeals.push(dayMeal);
            }
        }
        const sortedCheckMeals = [...checkMeals].sort((a, b) => a.order - b.order);
        if (generateMealsSettings === 'changeAmountAddedMeals') {
            //przy losowaniu sprawdzić meal.dinners.length
            //jeśli są potrawy wybrać ten posiłek (sortedCheckMeals[0]) zamiast losować
            //obliczać porcje
            const mealsToRecommend = yield Promise.all(sortedCheckMeals.map((meal) => __awaiter(void 0, void 0, void 0, function* () {
                const mealDinners = yield (0, dietDinner_service_1.getDietDinners)({ dietMealId: meal._id });
                if (mealDinners.length > 0) {
                    return Object.assign(Object.assign({}, meal), { generatedType: 'addedChangePortion' });
                }
                return Object.assign(Object.assign({}, meal), { generatedType: 'new' });
            }))); //correct
            //przy losowaniu zwrócić uwagę na generatedType
            //if addedChangePortion => nie losować posiłku tylko zostawić a następnie dostosować ilość
            const generatedDayMeals = yield (0, mealGenerate_1.mealsGenerate)({
                mealsToRecommend,
                currentDayId,
            });
            console.log({ generatedDayMeals });
            generatedAllDayMeals.push(generatedDayMeals);
            //   const dietDayGenerateObj: IDietGenerateDay = {
            //     _id: currentDayId,
            //     total: {
            //       kcal: roundValue(
            //         generatedMeals.reduce(
            //           (acc, field) => acc + Number(field.total.kcal),
            //           0
            //         )
            //       ),
            //       protein: {
            //         gram: roundValue(
            //           generatedMeals.reduce(
            //             (acc, field) => acc + Number(field.total.protein.gram),
            //             0
            //           )
            //         ),
            //       },
            //       fat: {
            //         gram: roundValue(
            //           generatedMeals.reduce(
            //             (acc, field) => acc + Number(field.total.fat.gram),
            //             0
            //           )
            //         ),
            //       },
            //       carbohydrates: {
            //         gram: roundValue(
            //           generatedMeals.reduce(
            //             (acc, field) => acc + Number(field.total.carbohydrates.gram),
            //             0
            //           )
            //         ),
            //       },
            //     },
            //     meals: generatedMeals,
            //   };
            //   generatedDays.push(dietDayGenerateObj);
        }
        // if (generateMealsSettings === "newMeals") {
        //   const mealsToRandom: IMealToRandom[] = sortedCheckMeals.map((meal) => ({
        //     ...meal,
        //     generatedType: "new",
        //   }));
        //   const generatedMeals = generateMeals({
        //     mealsToGenerate: mealsToRandom,
        //     availableMealsToRandom: availableDietMealsToRandom,
        //     currentDayId,
        //     allDietMeals,
        //   });
        //   const dietDayGenerateObj: IDietGenerateDay = {
        //     _id: currentDayId,
        //     total: {
        //       kcal: roundValue(
        //         generatedMeals.reduce(
        //           (acc, field) => acc + Number(field.total.kcal),
        //           0
        //         )
        //       ),
        //       protein: {
        //         gram: roundValue(
        //           generatedMeals.reduce(
        //             (acc, field) => acc + Number(field.total.protein.gram),
        //             0
        //           )
        //         ),
        //       },
        //       fat: {
        //         gram: roundValue(
        //           generatedMeals.reduce(
        //             (acc, field) => acc + Number(field.total.fat.gram),
        //             0
        //           )
        //         ),
        //       },
        //       carbohydrates: {
        //         gram: roundValue(
        //           generatedMeals.reduce(
        //             (acc, field) => acc + Number(field.total.carbohydrates.gram),
        //             0
        //           )
        //         ),
        //       },
        //     },
        //     meals: generatedMeals,
        //   };
        //   generatedDays.push(dietDayGenerateObj);
        // }
        // if (generateMealsSettings === "saveAddedMeals") {
        //   //nie wybiera posiłków z potrawami - poprawić
        //   const savedMeals = sortedCheckMeals.filter(
        //     (meal) => meal.dinners.length >= 1
        //   );
        //   const filterMealsToRandom = sortedCheckMeals.filter(
        //     (meal) => meal.dinners.length < 1
        //   );
        //   console.log({ savedMeals, filterMealsToRandom });
        //   const mealsToRandom: IMealToRandom[] = filterMealsToRandom.map(
        //     (meal) => ({
        //       ...meal,
        //       generatedType: "new",
        //     })
        //   );
        //   const generatedMeals = generateMeals({
        //     mealsToGenerate: mealsToRandom,
        //     availableMealsToRandom: availableDietMealsToRandom,
        //     currentDayId,
        //     allDietMeals,
        //   });
        //   const savedMealsCheck: IDietGenerateMeal[] = savedMeals.map((meal) => ({
        //     _id: meal._id,
        //     name: meal.name,
        //     type: meal.type,
        //     generatedType: "added",
        //     total: meal.total,
        //     selectedGroup: undefined,
        //     generatedDinners: [],
        //     addedMealObj: meal,
        //   }));
        //   const allMeals = savedMealsCheck.concat(generatedMeals);
        //   console.log({ allMeals });
        //   const dietDayGenerateObj: IDietGenerateDay = {
        //     _id: currentDayId,
        //     total: {
        //       kcal: roundValue(
        //         allMeals.reduce((acc, field) => acc + Number(field.total.kcal), 0)
        //       ),
        //       protein: {
        //         gram: roundValue(
        //           allMeals.reduce(
        //             (acc, field) => acc + Number(field.total.protein.gram),
        //             0
        //           )
        //         ),
        //       },
        //       fat: {
        //         gram: roundValue(
        //           allMeals.reduce(
        //             (acc, field) => acc + Number(field.total.fat.gram),
        //             0
        //           )
        //         ),
        //       },
        //       carbohydrates: {
        //         gram: roundValue(
        //           allMeals.reduce(
        //             (acc, field) => acc + Number(field.total.carbohydrates.gram),
        //             0
        //           )
        //         ),
        //       },
        //     },
        //     meals: allMeals,
        //   };
        // }
        timer(Object.assign(Object.assign({}, metricsLabels), { success: 'true' }));
        return {
            generatedAllDayMeals,
        };
    }
    catch (e) {
        timer(Object.assign(Object.assign({}, metricsLabels), { success: 'false' }));
        throw e;
    }
});
exports.dietDayGenerate = dietDayGenerate;
const roundValue = (value) => {
    return Math.round(value * 1e2) / 1e2;
};
