"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roundMacro = exports.cartesianGroupMissingProcentCount = exports.cartesianDinners = void 0;
const cartesianDinners = (currentProcent, mealEstablishment, dietEstablishment, ...portions) => {
    const result = [];
    const max = portions.length - 1;
    let loop = 0;
    const helper = (arr, i) => {
        for (let j = 0, l = portions[i].length; j < l; j++) {
            const a = arr.slice(0); // clone arr
            a.push(portions[i][j]);
            if (i == max) {
                // if (result.length < 100000) {
                //   result.push(a);
                // }
                //meal establishments uwzględnić przedziały
                //przy przedziałach nie trzeba tu liczyć missing procent tylko minMissingProcent  => przykład => dania
                loop = loop + 1;
                if (result.length === 100000) {
                    return;
                }
                const macroTotalCount = cartesianGroupTotalCount(a); //correct
                const missingProcentCount = (0, exports.cartesianGroupMissingProcentCount)(macroTotalCount, mealEstablishment, dietEstablishment);
                const cartesianProductGroup = {
                    products: a,
                    macroTotalCount,
                    missingProcentCount,
                };
                if (Math.abs(missingProcentCount.missingKcalProcent) <= currentProcent) {
                    return result.push(cartesianProductGroup);
                }
                // result.push(cartesianProductGroup);
                //poprawić (może brakować grup)
                // if (loop === 1000000) {
                //   return;
                // }
                //przy randomDinner obliczyć najwiekszą mozliwą porcje i najmniejszą jesli nie miesci sie w przedziale wylosowac ponownie
                // result.push(cartesianProductGroup);
            }
            else {
                helper(a, i + 1);
            }
        }
    };
    helper([], 0);
    return result;
};
exports.cartesianDinners = cartesianDinners;
const cartesianGroupTotalCount = (groups) => {
    const total_kcal = (0, exports.roundMacro)(countCartesianMacroTotal(groups, 'portionKcal'));
    const total_gram = (0, exports.roundMacro)(countCartesianMacroTotal(groups, 'portion'));
    const total_protein_gram = (0, exports.roundMacro)(countCartesianMacroTotal(groups, 'portionProteinGram'));
    const total_protein_kcal = (0, exports.roundMacro)(total_protein_gram * 4);
    const total_protein_procent = (0, exports.roundMacro)((total_protein_kcal * 100) / total_kcal);
    const total_fat_gram = (0, exports.roundMacro)(countCartesianMacroTotal(groups, 'portionFatGram'));
    const total_fat_kcal = (0, exports.roundMacro)(total_fat_gram * 9);
    const total_fat_procent = (0, exports.roundMacro)((total_fat_kcal * 100) / total_kcal);
    const total_carbohydrates_gram = (0, exports.roundMacro)(countCartesianMacroTotal(groups, 'portionCarbohydratesGram'));
    const total_carbohydrates_kcal = (0, exports.roundMacro)(total_carbohydrates_gram * 4);
    const total_carbohydrates_procent = (0, exports.roundMacro)((total_carbohydrates_kcal * 100) / total_kcal);
    return {
        total_kcal,
        total_gram,
        total_protein_gram,
        total_protein_kcal,
        total_protein_procent,
        total_fat_gram,
        total_fat_kcal,
        total_fat_procent,
        total_carbohydrates_gram,
        total_carbohydrates_kcal,
        total_carbohydrates_procent,
    };
};
const countCartesianMacroTotal = (groups, key) => {
    const total = groups.reduce((acc, field) => acc + Number(field[key]), 0);
    return total;
};
const cartesianGroupMissingProcentCount = (macroTotalCount, mealEstablishment, dietEstablishment) => {
    const kcal = mealEstablishment.kcal;
    const dietProteinProcent = dietEstablishment.protein.procent;
    const dietFatProcent = dietEstablishment.fat.procent;
    const dietCarbohydratesProcent = dietEstablishment.carbohydrates.procent;
    const mealProteinKcal = (0, exports.roundMacro)((dietProteinProcent * kcal) / 100);
    const mealProteinGram = (0, exports.roundMacro)(mealProteinKcal / 4);
    const mealFatKcal = (0, exports.roundMacro)((dietFatProcent * kcal) / 100);
    const mealFatGram = (0, exports.roundMacro)(mealFatKcal / 9);
    const mealCarbohydratesKcal = (0, exports.roundMacro)((dietCarbohydratesProcent * kcal) / 100);
    const mealCarbohydratesGram = (0, exports.roundMacro)(mealCarbohydratesKcal / 4);
    // const proteinGram = mealEstablishment.protein.gram;
    // const fatGram = mealEstablishment.fat.gram;
    // const carbohydratesGram = mealEstablishment.carbohydrates.gram;
    const missingKcal = (0, exports.roundMacro)(kcal - macroTotalCount.total_kcal);
    const missingProteinGram = (0, exports.roundMacro)(mealProteinGram - macroTotalCount.total_protein_gram);
    const missingFatGram = (0, exports.roundMacro)(mealFatGram - macroTotalCount.total_fat_gram);
    const missingCarbohydratesGram = (0, exports.roundMacro)(mealCarbohydratesGram - macroTotalCount.total_carbohydrates_gram);
    //missing procent
    const missingKcalProcent = (0, exports.roundMacro)((missingKcal * 100) / kcal);
    const missingProteinProcent = (0, exports.roundMacro)((missingProteinGram * 100) / mealProteinGram);
    const missingFatProcent = (0, exports.roundMacro)((missingFatGram * 100) / mealFatGram);
    const missingCarbohydratesProcent = (0, exports.roundMacro)((missingCarbohydratesGram * 100) / mealCarbohydratesGram);
    const allMacroMissingProcent = () => {
        const sum = Math.abs(missingProteinProcent) +
            Math.abs(missingFatProcent) +
            Math.abs(missingCarbohydratesProcent);
        return sum;
    };
    const proteinPerfectPercentageRange = macroTotalCount.total_protein_procent >=
        dietEstablishment.protein.min_procent &&
        macroTotalCount.total_protein_procent <=
            dietEstablishment.protein.max_procent;
    const fatPerfectPercentageRange = macroTotalCount.total_fat_procent >= dietEstablishment.fat.min_procent &&
        macroTotalCount.total_fat_procent <= dietEstablishment.fat.max_procent;
    const carbohydratesPerfectPercentageRange = macroTotalCount.total_carbohydrates_procent >=
        dietEstablishment.carbohydrates.min_procent &&
        macroTotalCount.total_carbohydrates_procent <=
            dietEstablishment.carbohydrates.max_procent;
    return {
        missingKcal,
        missingKcalProcent,
        missingProteinGram,
        missingFatGram,
        missingCarbohydratesGram,
        missingProteinProcent,
        missingFatProcent,
        missingCarbohydratesProcent,
        missingAllMacroProcentSum: allMacroMissingProcent(),
        proteinPerfectPercentageRange,
        fatPerfectPercentageRange,
        carbohydratesPerfectPercentageRange,
    };
};
exports.cartesianGroupMissingProcentCount = cartesianGroupMissingProcentCount;
const roundMacro = (macro) => {
    return Math.round(macro * 1e2) / 1e2;
};
exports.roundMacro = roundMacro;
