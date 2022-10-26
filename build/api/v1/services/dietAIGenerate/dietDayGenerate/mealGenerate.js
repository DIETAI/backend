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
exports.mealsGenerate = void 0;
const metrics_1 = require("../../../utils/metrics");
const diet_service_1 = require("../../diet/diet.service");
const dietMeal_service_1 = require("../../diet/dietMeal.service");
const dietEstablishment_service_1 = require("../../dietEstablishment.service");
//functions
const mealRecommend_1 = require("./mealRecommend/mealRecommend");
const getDinnerPortionsMacro_1 = require("./portionsMacro/getDinnerPortionsMacro");
const cartesianDinners_1 = require("./cartesianDinners/cartesianDinners");
const selectGroups_1 = require("./selectGroups");
const dinnerPortion_service_1 = require("../../dinner/dinnerPortion.service");
const dinner_service_1 = require("../../dinner/dinner.service");
const dietDinner_service_1 = require("../../diet/dietDinner.service");
const dietDay_service_1 = require("../../diet/dietDay.service");
const mealsGenerate = ({ mealsToRecommend, currentDayId, }) => __awaiter(void 0, void 0, void 0, function* () {
    const metricsLabels = {
        operation: 'mealsGenerate',
    };
    const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
    try {
        //random dietMeals
        const dayRecommendMeals = [];
        for (let mealIndex = 0, length = mealsToRecommend.length; mealIndex < length; mealIndex++) {
            console.log('start generowania posiłku');
            const meal = mealsToRecommend[mealIndex];
            console.log({ mealIndex });
            if (meal.generatedType === 'addedChangePortion') {
                const mealDinners = yield (0, dietDinner_service_1.getDietDinners)({ dietMealId: meal._id });
                const mealObj = {
                    dayMealId: meal._id,
                    dayMealType: meal.type,
                    dayMealDinners: mealDinners,
                    dayId: meal.dayId,
                    generatedType: meal.generatedType,
                };
                console.log({ mealObj });
                dayRecommendMeals.push(mealObj);
            }
            else {
                if (dayRecommendMeals.length < 1) {
                    //ważne
                    //poprawić funkcje rekomendacji z pustą tablicą
                    const recommendMeal = yield (0, mealRecommend_1.mealRecommend)({
                        mealDayId: meal.dayId,
                        mealType: meal.type,
                        currentDayRecommendDinners: [],
                    });
                    const randomMealWithGeneratedType = Object.assign(Object.assign({}, recommendMeal), { generatedType: meal.generatedType });
                    dayRecommendMeals.push(randomMealWithGeneratedType);
                }
                else {
                    const flatDayDinners = dayRecommendMeals.flatMap(({ dayMealDinners }) => dayMealDinners);
                    const currentDayRecommendDinners = yield Promise.all(flatDayDinners.map((dietDinner) => __awaiter(void 0, void 0, void 0, function* () {
                        const dinnerPortion = yield (0, dinnerPortion_service_1.getDinnerPortion)({
                            _id: dietDinner.dinnerPortionId,
                        });
                        const dinner = (yield (0, dinner_service_1.getDinner)({
                            _id: dinnerPortion === null || dinnerPortion === void 0 ? void 0 : dinnerPortion.dinnerId,
                        }));
                        //dayMealDietDinners
                        const dietDinnerToRecommend = {
                            _id: dietDinner._id,
                            userId: dietDinner.user,
                            'diet.clientId': 'sda',
                            'diet.clientPreferencesGroup': 1,
                            'dinner._id': dinner._id,
                            'dinner.name': dinner.name,
                            'dinner.products': [],
                            'dinner.likedProductsPoints': 0,
                            'diet._id': dietDinner.dietId,
                            'diet.name': 'dieta 5',
                            'day._id': 'nowy',
                            'day.name': 'dzien 1',
                            'meal._id': dietDinner.dietMealId,
                            'meal.name': meal.name,
                            'meal.type': meal.type,
                        };
                        return dietDinnerToRecommend;
                    })));
                    const recommendMeal = yield (0, mealRecommend_1.mealRecommend)({
                        mealDayId: meal.dayId,
                        mealType: meal.type,
                        currentDayRecommendDinners,
                    });
                    const randomMealWithGeneratedType = Object.assign(Object.assign({}, recommendMeal), { generatedType: meal.generatedType });
                    console.log(`Wybrano posiłek poprzez: ${recommendMeal.dayMealGenerateType}`);
                    dayRecommendMeals.push(randomMealWithGeneratedType);
                }
            }
        }
        const mealsDinnersPortionsMacro = yield Promise.all(dayRecommendMeals.map((recommendMeal) => __awaiter(void 0, void 0, void 0, function* () {
            const dinnerPortionsMacro = yield Promise.all(recommendMeal.dayMealDinners.map((recommendDietDinner) => __awaiter(void 0, void 0, void 0, function* () {
                const dinnerMacroPortion = yield (0, getDinnerPortionsMacro_1.getMealDinnersPortionsMacro)(recommendDietDinner);
                return Object.assign(Object.assign({}, recommendDietDinner), { dinnerMacroPortion });
            })));
            return Object.assign(Object.assign({}, recommendMeal), { dinnerPortionsMacro });
        })));
        if (!mealsDinnersPortionsMacro)
            return;
        const mealDinners = mealsDinnersPortionsMacro.map((meal) => {
            const allMealDinnerProductsWithPortions = meal.dinnerPortionsMacro.map(({ dinnerMacroPortion }) => {
                const portions = dinnerMacroPortion.dinnerProductsPortions;
                return portions;
            });
            // console.log({ allMealDinnerProductsWithPortions });
            const concatMealDinnersPortions = allMealDinnerProductsWithPortions.flatMap((mealDinners) => mealDinners);
            // console.log({ concatMealDinnersPortions });
            //złączenie wszystkich produktów w posiłku (odróżnienie za pomocą dinnerId)
            //concatMealDinners => algorytm kartezjański
            return Object.assign(Object.assign({}, meal), { concatMealDinnersPortions });
        });
        const day = yield (0, dietDay_service_1.getDietDay)({ _id: currentDayId });
        const diet = yield (0, diet_service_1.getDiet)({ _id: day === null || day === void 0 ? void 0 : day.dietId });
        if (!diet)
            return;
        const dietEstablishment = yield (0, dietEstablishment_service_1.getDietEstablishment)({
            _id: diet.establishmentId,
        });
        if (!dietEstablishment)
            return;
        console.time('cartesianProduct');
        // połączone porcje wszystkich dań posiłków np (danie główne i danie uzupełniające)
        const dinnersCartesianGroups = yield Promise.all(mealDinners.map((mealDinner) => __awaiter(void 0, void 0, void 0, function* () {
            const meal = (yield (0, dietMeal_service_1.getDietMeal)({
                _id: mealDinner.dayMealId,
            }));
            const currentDayMeal = (yield (0, dietMeal_service_1.getDietMeal)({
                dayId: currentDayId,
                type: meal.type,
            })); //znajduje meal danego dnia
            const mealEstablishment = dietEstablishment.meals.find(({ _id }) => _id === currentDayMeal.establishmentMealId); //błąd
            // console.log({
            //   mealEstablishmentId: currentDayMeal.establishmentMealId, //inCorrect
            //   dietEstablishmentMealsId: dietEstablishment.meals.map(
            //     (mealE) => mealE._id //correct
            //   ),
            // });
            const cartesianResultGroups = [];
            for (let currentProcent = 2, l = 100; currentProcent < l; currentProcent++) {
                const dinnersCartesianGroups = (0, cartesianDinners_1.cartesianDinners)(currentProcent, mealEstablishment, //get establishment
                dietEstablishment, ...mealDinner.concatMealDinnersPortions);
                if (dinnersCartesianGroups.length > 0) {
                    console.log(`Procent odchylenia grup: ${currentProcent}`);
                    cartesianResultGroups.push(...dinnersCartesianGroups);
                    break;
                }
                if (currentProcent === l - 1) {
                    console.log({ mealName: meal.name, procent: currentProcent });
                }
            }
            const cartesianGroup = {
                mealId: meal._id,
                mealName: meal.name,
                mealsType: meal.type,
                generatedType: mealDinner.generatedType,
                randomType: mealDinner.dayMealGenerateType,
                mealEstablishment: mealEstablishment,
                groups: cartesianResultGroups,
            };
            console.log({
                groupsLength: cartesianResultGroups.length,
                mealName: meal.name,
            });
            return cartesianGroup;
        })));
        console.timeEnd('cartesianProduct');
        const selectedDinners = dinnersCartesianGroups.map((meal) => ({
            mealId: meal.mealId,
            mealName: meal.mealName,
            generatedType: meal.generatedType,
            randomType: meal.randomType,
            mealType: meal.mealsType,
            groups: (0, selectGroups_1.selectGroups)(meal.groups),
        }));
        const generatedMeals = yield Promise.all(selectedDinners.map((meal) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g;
            const randomMeal = dayRecommendMeals.filter((randomMeal) => randomMeal.dayMealId == meal.mealId.toString())[0];
            const mealDinners = yield Promise.all(randomMeal.dayMealDinners.map((dietDinner) => __awaiter(void 0, void 0, void 0, function* () {
                var _h, _j;
                const dinnerPortion = (yield (0, dinnerPortion_service_1.getDinnerPortion)({
                    _id: dietDinner.dinnerPortionId,
                }));
                const dinner = (yield (0, dinner_service_1.getDinner)({
                    _id: dinnerPortion.dinnerId,
                }));
                console.log({ mainGroup: meal.groups.main });
                const mealDinnerObj = {
                    _id: dietDinner._id,
                    dinnerId: dinner._id,
                    dinnerName: dinner.name,
                    dinnerImage: dinner.image,
                    dinnerProducts: (_j = (_h = meal.groups.main) === null || _h === void 0 ? void 0 : _h.group) === null || _j === void 0 ? void 0 : _j.products.filter(({ dinnerId }) => dinnerId == dinner._id.toString()),
                    total: {
                        kcal: roundValue(meal.groups.main.group.products.reduce((acc, field) => acc + Number(field.portionKcal), 0)),
                        protein: {
                            gram: roundValue(meal.groups.main.group.products.reduce((acc, field) => acc + Number(field.portionProteinGram), 0)),
                        },
                        fat: {
                            gram: roundValue(meal.groups.main.group.products.reduce((acc, field) => acc + Number(field.portionFatGram), 0)),
                        },
                        carbohydrates: {
                            gram: roundValue(meal.groups.main.group.products.reduce((acc, field) => acc + Number(field.portionCarbohydratesGram), 0)),
                        },
                    },
                };
                return mealDinnerObj;
            })));
            const currentDayMeal = (yield (0, dietMeal_service_1.getDietMeal)({
                dayId: currentDayId,
                type: meal.mealType,
            }));
            const mealObj = {
                _id: currentDayMeal._id,
                name: meal.mealName,
                type: meal.mealType,
                generatedType: meal.generatedType,
                randomType: meal.randomType,
                totalGroups: (_a = dinnersCartesianGroups.find((cartesianGroup) => cartesianGroup.mealsType === meal.mealType)) === null || _a === void 0 ? void 0 : _a.groups.length,
                selectedGroup: {
                    type: meal.groups.main.type,
                    name: meal.groups.main.name,
                    description: meal.groups.main.description,
                    macroTotalCount: (_b = meal.groups.main.group) === null || _b === void 0 ? void 0 : _b.macroTotalCount,
                    missingProcentCount: (_c = meal.groups.main.group) === null || _c === void 0 ? void 0 : _c.missingProcentCount,
                },
                generatedDinners: mealDinners,
                total: {
                    kcal: (_d = meal.groups.main.group.macroTotalCount) === null || _d === void 0 ? void 0 : _d.total_kcal,
                    procent: 0,
                    protein: {
                        procent: 0,
                        kcal: 0,
                        gram: (_e = meal.groups.main.group.macroTotalCount) === null || _e === void 0 ? void 0 : _e.total_protein_gram,
                    },
                    fat: {
                        procent: 0,
                        kcal: 0,
                        gram: (_f = meal.groups.main.group.macroTotalCount) === null || _f === void 0 ? void 0 : _f.total_fat_gram,
                    },
                    carbohydrates: {
                        procent: 0,
                        kcal: 0,
                        gram: (_g = meal.groups.main.group.macroTotalCount) === null || _g === void 0 ? void 0 : _g.total_carbohydrates_gram,
                    },
                    fiber: {
                        kcal: 0,
                        gram: 0,
                    },
                },
            };
            return mealObj;
        })));
        console.log({ dayRecommendMeals });
        timer(Object.assign(Object.assign({}, metricsLabels), { success: 'true' }));
        return generatedMeals;
    }
    catch (e) {
        console.log(e);
        timer(Object.assign(Object.assign({}, metricsLabels), { success: 'false' }));
        throw e;
    }
});
exports.mealsGenerate = mealsGenerate;
const roundValue = (value) => {
    return Math.round(value * 1e2) / 1e2;
};
