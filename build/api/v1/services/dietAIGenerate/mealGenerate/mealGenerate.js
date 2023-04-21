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
exports.mealGenerate = void 0;
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
const mealGenerate = ({ mealId, mealGenerateOption, }) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('start generowania posiłku');
    const metricsLabels = {
        operation: 'mealGenerate',
    };
    const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
    try {
        const meal = yield (0, dietMeal_service_1.getDietMeal)({ _id: mealId });
        //correct
        if (!meal) {
            return;
        }
        let recommendMeal;
        if (mealGenerateOption === 'changeAmountAddedMealDinners') {
            const mealDinners = yield (0, dietDinner_service_1.getDietDinners)({ dietMealId: mealId });
            const mealObj = {
                dayMealId: mealId,
                dayMealDinners: mealDinners,
                dayId: meal.dayId,
            };
            recommendMeal = Object.assign(Object.assign({}, mealObj), { mealGenerateOption });
        }
        else {
            const recommendedMeal = yield (0, mealRecommend_1.mealRecommend)({
                mealDayId: meal.dayId,
                mealType: meal.type,
            });
            if (!recommendedMeal)
                return; //random dietMeal
            recommendMeal = Object.assign(Object.assign({}, recommendedMeal), { mealGenerateOption });
            console.log(recommendMeal);
        }
        console.log(`Wybrano posiłek poprzez: ${recommendMeal.dayMealGenerateType}`);
        const mealDinnersPortionsMacro = yield Promise.all(recommendMeal.dayMealDinners.map((dinner) => __awaiter(void 0, void 0, void 0, function* () {
            const dinnerMacroPortion = yield (0, getDinnerPortionsMacro_1.getMealDinnersPortionsMacro)(dinner);
            return dinnerMacroPortion;
        })));
        if (!mealDinnersPortionsMacro)
            return;
        const mealDinners = mealDinnersPortionsMacro.flatMap((mealDinner) => {
            return mealDinner.dinnerProductsPortions;
        });
        // złączenie wszystkich produktów w posiłku (odróżnienie za pomocą dinnerId)
        const diet = yield (0, diet_service_1.getDiet)({ _id: meal.dietId });
        if (!diet)
            return;
        const dietEstablishment = yield (0, dietEstablishment_service_1.getDietEstablishment)({
            _id: diet.establishmentId,
        });
        if (!dietEstablishment)
            return;
        const mealEstablishment = dietEstablishment.meals.find(({ _id }) => _id === meal.establishmentMealId);
        if (!mealEstablishment)
            return;
        console.time('cartesianProduct');
        //    // połączone porcje wszystkich dań posiłków np (danie główne i danie uzupełniające)
        const maxCartesianGroups = mealDinners.length < 6 ? 50000 : 100;
        // //zabezpieczenie przed brakiem grup (zmiana procenta)
        const cartesianResultGroups = [];
        for (let currentProcent = 2, l = 100; currentProcent < l; currentProcent++) {
            const dinnersCartesianGroups = (0, cartesianDinners_1.cartesianDinners)(mealEstablishment, dietEstablishment, maxCartesianGroups, currentProcent, ...mealDinners);
            if (dinnersCartesianGroups.length > 0) {
                console.log(`Procent odchylenia grup: ${currentProcent}`);
                cartesianResultGroups.push(...dinnersCartesianGroups);
                break;
            }
        }
        // const currentProcent = 5;
        // const dinnersCartesianGroups = cartesianDinners(
        //   mealEstablishment,
        //   dietEstablishment,
        //   maxCartesianGroups,
        //   currentProcent,
        //   ...mealDinners
        // );
        console.timeEnd('cartesianProduct');
        const selectedDinnersGroups = (0, selectGroups_1.selectGroups)(cartesianResultGroups);
        console.log({ cartesianResultGroups });
        console.log('Wybrano grupy'); //correct
        console.log({ selectedDinnersGroups });
        // console.log(selectedDinnersGroups.main);
        const selectedMealDinners = yield Promise.all(recommendMeal.dayMealDinners.map((dietDinner) => __awaiter(void 0, void 0, void 0, function* () {
            const dinnerPortion = (yield (0, dinnerPortion_service_1.getDinnerPortion)({
                _id: dietDinner.dinnerPortionId,
            }));
            const dinner = (yield (0, dinner_service_1.getDinner)({
                _id: dinnerPortion.dinnerId,
            }));
            const dinnerId = dinner._id.toString();
            const dinnerObj = {
                _id: dietDinner._id,
                dinnerId: dinner._id,
                dinnerName: dinner.name,
                dinnerProducts: selectedDinnersGroups.main.group.products.filter((dinnerProduct) => dinnerProduct.dinnerId == dinnerId),
            };
            return dinnerObj;
        })));
        const generatedMealObj = {
            dietMeal: {
                _id: meal._id,
                dayId: meal.dayId,
                dietId: meal.dietId,
            },
            selectedMealGroup: {
                type: selectedDinnersGroups.main.type,
                name: selectedDinnersGroups.main.name,
                description: selectedDinnersGroups.main.description,
                macroTotalCount: selectedDinnersGroups.main.group.macroTotalCount,
                missingProcentCount: selectedDinnersGroups.main.group.missingProcentCount,
            },
            mealGenerateOption,
            mealDinners: selectedMealDinners,
            totalGroups: cartesianResultGroups.length,
        };
        //mealDinnersCartesianGroups
        //mealDinnersSelectGroups
        timer(Object.assign(Object.assign({}, metricsLabels), { success: 'true' }));
        return {
            recommendMeal,
            selectedDinnersGroups,
            generatedMealObj,
        };
    }
    catch (e) {
        timer(Object.assign(Object.assign({}, metricsLabels), { success: 'false' }));
        throw e;
    }
});
exports.mealGenerate = mealGenerate;
