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
exports.dinnerPortionGenerate = void 0;
const metrics_1 = require("../../../utils/metrics");
const diet_service_1 = require("../../diet/diet.service");
const dietEstablishment_service_1 = require("../../dietEstablishment.service");
//functions
const getDinnerPortionsMacro_1 = require("./portionsMacro/getDinnerPortionsMacro");
const cartesianDinners_1 = require("./cartesianDinners/cartesianDinners");
const selectGroups_1 = require("./selectGroups");
const dinnerPortionGenerate = ({ dietId, dinnerId, mealEstablishment, }) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('start generowania zestawu porcji');
    const metricsLabels = {
        operation: 'dinnerPortionGenerate',
    };
    const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
    console.log({ dietId, dinnerId, mealEstablishment });
    try {
        const dinnerAllPortionsMacro = yield (0, getDinnerPortionsMacro_1.getDinnerPortionsMacro)(dinnerId);
        console.log({ dinnerAllPortionsMacro });
        if (!dinnerAllPortionsMacro)
            return;
        const diet = yield (0, diet_service_1.getDiet)({ _id: dietId });
        if (!diet)
            return;
        const dietEstablishment = yield (0, dietEstablishment_service_1.getDietEstablishment)({
            _id: diet.establishmentId,
        });
        if (!dietEstablishment)
            return;
        // const mealEstablishment = dietEstablishment.meals.find(
        //   ({ _id }) => _id === meal.establishmentMealId
        // );
        // if (!mealEstablishment) return;
        console.time('cartesianProduct');
        //    // połączone porcje wszystkich dań posiłków np (danie główne i danie uzupełniające)
        // //zabezpieczenie przed brakiem grup (zmiana procenta)
        const cartesianResultGroups = [];
        for (let currentProcent = 2, l = 10; currentProcent < l; currentProcent++) {
            const dinnersCartesianGroups = (0, cartesianDinners_1.cartesianDinners)(dietEstablishment, mealEstablishment, currentProcent, ...dinnerAllPortionsMacro);
            if (dinnersCartesianGroups.length > 0) {
                console.log(`Procent odchylenia grup: ${currentProcent}`);
                cartesianResultGroups.push(...dinnersCartesianGroups);
                break;
            }
        }
        console.timeEnd('cartesianProduct');
        console.log({ groupsLength: cartesianResultGroups.length });
        const selectedDinnersGroups = (0, selectGroups_1.selectGroups)(cartesianResultGroups);
        if (!selectedDinnersGroups.main.group) {
            return;
        }
        const dinnerProducts = selectedDinnersGroups.main.group.products.map((dinnerProduct) => {
            return {
                _id: dinnerProduct.dinnerProductId,
                portionGram: dinnerProduct.portion,
                total: {
                    kcal: dinnerProduct.portionKcal,
                    protein: {
                        gram: dinnerProduct.portionProteinGram,
                        kcal: dinnerProduct.portionProteinKcal,
                    },
                    fat: {
                        gram: dinnerProduct.portionFatGram,
                        kcal: dinnerProduct.portionFatKcal,
                    },
                    carbohydrates: {
                        gram: dinnerProduct.portionCarbohydratesGram,
                        kcal: dinnerProduct.portionCarbohydratesKcal,
                    },
                    fiber: {
                        gram: dinnerProduct.portionFiberGram,
                        kcal: dinnerProduct.portionFiberKcal,
                    },
                    digestableCarbohydrates: {
                        gram: dinnerProduct.portionDisgestibleCarbohydratesGram,
                        kcal: dinnerProduct.portionDisgestibleCarbohydratesKcal,
                    },
                    carbohydrateExchangers: 5,
                    proteinFatExchangers: 5,
                },
            };
        });
        const generatedDinnerPortion = {
            uid: 'custom1',
            dinnerProducts: dinnerProducts,
            total: {
                kcal: selectedDinnersGroups.main.group.macroTotalCount.total_kcal,
                protein: {
                    gram: selectedDinnersGroups.main.group.macroTotalCount
                        .total_protein_gram,
                    kcal: selectedDinnersGroups.main.group.macroTotalCount
                        .total_protein_kcal,
                },
                fat: {
                    gram: selectedDinnersGroups.main.group.macroTotalCount.total_fat_gram,
                    kcal: selectedDinnersGroups.main.group.macroTotalCount.total_fat_kcal,
                },
                carbohydrates: {
                    gram: selectedDinnersGroups.main.group.macroTotalCount
                        .total_carbohydrates_gram,
                    kcal: selectedDinnersGroups.main.group.macroTotalCount
                        .total_carbohydrates_kcal,
                },
                fiber: {
                    gram: selectedDinnersGroups.main.group.macroTotalCount
                        .total_fiber_gram,
                    kcal: selectedDinnersGroups.main.group.macroTotalCount
                        .total_fiber_kcal,
                },
                digestableCarbohydrates: {
                    gram: selectedDinnersGroups.main.group.macroTotalCount
                        .total_digestableCarbohydrates_gram,
                    kcal: selectedDinnersGroups.main.group.macroTotalCount
                        .total_digestableCarbohydrates_kcal,
                },
                carbohydrateExchangers: 5,
                proteinFatExchangers: 5,
            },
        };
        console.log('Wybrano grupy');
        timer(Object.assign(Object.assign({}, metricsLabels), { success: 'true' }));
        return generatedDinnerPortion;
    }
    catch (e) {
        timer(Object.assign(Object.assign({}, metricsLabels), { success: 'false' }));
        throw e;
    }
});
exports.dinnerPortionGenerate = dinnerPortionGenerate;
const roundValue = (value) => {
    return Math.round(value * 1e2) / 1e2;
};
