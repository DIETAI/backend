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
const dietDay_service_1 = require("../../diet/dietDay.service");
const dietDayGenerate = ({ currentDayId, mealsToGenerate, generateMealsSettings, }) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('start generowania dnia');
    const metricsLabels = {
        operation: 'dayGenerate',
    };
    const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
    // const generatedAllDayMeals = [];
    try {
        const currentDay = yield (0, dietDay_service_1.getDietDay)({ _id: currentDayId });
        if (!currentDay)
            return;
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
            if (!generatedDayMeals)
                return;
            console.log({ generatedDayMeals });
            const dietDayGenerateObj = {
                _id: currentDayId,
                order: currentDay.order,
                total: {
                    kcal: roundValue(generatedDayMeals.reduce((acc, field) => acc + Number(field.total.kcal), 0)),
                    protein: {
                        gram: roundValue(generatedDayMeals.reduce((acc, field) => acc + Number(field.total.protein.gram), 0)),
                    },
                    fat: {
                        gram: roundValue(generatedDayMeals.reduce((acc, field) => acc + Number(field.total.fat.gram), 0)),
                    },
                    carbohydrates: {
                        gram: roundValue(generatedDayMeals.reduce((acc, field) => acc + Number(field.total.carbohydrates.gram), 0)),
                    },
                },
                meals: generatedDayMeals,
            };
            return dietDayGenerateObj;
        }
        if (generateMealsSettings === 'newMeals') {
            const mealsToRecommend = sortedCheckMeals.map((meal) => {
                return Object.assign(Object.assign({}, meal), { generatedType: 'new' });
            }); //correct
            const generatedDayMeals = yield (0, mealGenerate_1.mealsGenerate)({
                mealsToRecommend,
                currentDayId,
            });
            if (!generatedDayMeals)
                return;
            const dietDayGenerateObj = {
                _id: currentDayId,
                order: currentDay.order,
                total: {
                    kcal: roundValue(generatedDayMeals.reduce((acc, field) => acc + Number(field.total.kcal), 0)),
                    protein: {
                        gram: roundValue(generatedDayMeals.reduce((acc, field) => acc + Number(field.total.protein.gram), 0)),
                    },
                    fat: {
                        gram: roundValue(generatedDayMeals.reduce((acc, field) => acc + Number(field.total.fat.gram), 0)),
                    },
                    carbohydrates: {
                        gram: roundValue(generatedDayMeals.reduce((acc, field) => acc + Number(field.total.carbohydrates.gram), 0)),
                    },
                },
                meals: generatedDayMeals,
            };
            return dietDayGenerateObj;
        }
        if (generateMealsSettings === 'saveAddedMeals') {
            //nie wybiera posiłków z potrawami - poprawić
            const sortedCheckMealsWithDinners = yield Promise.all(sortedCheckMeals.map((dietMeal) => __awaiter(void 0, void 0, void 0, function* () {
                const mealDinners = yield (0, dietDinner_service_1.getDietDinners)({
                    dietMealId: dietMeal._id,
                });
                return Object.assign(Object.assign({}, dietMeal), { dietMealDinnersLength: mealDinners.length || 0 });
            })));
            const savedMeals = sortedCheckMealsWithDinners.filter((meal) => meal.dietMealDinnersLength >= 1);
            const filterMealsToRandom = sortedCheckMealsWithDinners.filter((meal) => meal.dietMealDinnersLength < 1); //as IDietMealDocument
            console.log({ savedMeals, filterMealsToRandom });
            const mealsToRecommend = filterMealsToRandom.map((meal) => (Object.assign(Object.assign({}, meal), { generatedType: 'new' }))); //correct
            //przy losowaniu zwrócić uwagę na generatedType
            //if addedChangePortion => nie losować posiłku tylko zostawić a następnie dostosować ilość
            const generatedDayMeals = yield (0, mealGenerate_1.mealsGenerate)({
                mealsToRecommend,
                currentDayId,
            });
            if (!generatedDayMeals)
                return;
            const savedMealsCheck = savedMeals.map((meal) => ({
                _id: meal._id,
                name: meal.name,
                type: meal.type,
                generatedType: 'added',
                randomType: 'random',
                total: meal.total,
                selectedGroup: undefined,
                generatedDinners: [],
                addedMealObj: meal,
            }));
            const allMeals = savedMealsCheck.concat(generatedDayMeals);
            const dietDayGenerateObj = {
                _id: currentDayId,
                order: currentDay.order,
                total: {
                    kcal: roundValue(allMeals.reduce((acc, field) => acc + Number(field.total.kcal), 0)),
                    protein: {
                        gram: roundValue(allMeals.reduce((acc, field) => acc + Number(field.total.protein.gram), 0)),
                    },
                    fat: {
                        gram: roundValue(allMeals.reduce((acc, field) => acc + Number(field.total.fat.gram), 0)),
                    },
                    carbohydrates: {
                        gram: roundValue(allMeals.reduce((acc, field) => acc + Number(field.total.carbohydrates.gram), 0)),
                    },
                },
                meals: allMeals,
            };
            return dietDayGenerateObj;
        }
        timer(Object.assign(Object.assign({}, metricsLabels), { success: 'true' }));
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
