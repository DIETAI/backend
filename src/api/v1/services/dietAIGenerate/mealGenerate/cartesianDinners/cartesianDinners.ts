import { IDietEstablishmentDocument } from '../../../../interfaces/dietEstablishments.interfaces';
import { DinnerPortionsMacro } from '../portionsMacro/getDinnerPortionsMacro';
import { IMealDinnersPortionsMacro } from '../portionsMacro/getDinnerPortionsMacro';

export const cartesianDinners = (
  mealEstablishment: IDietEstablishmentDocument['meals'][0],
  dietEstablishment: IDietEstablishmentDocument,
  maxCartesianGroups: number,
  currentProcent: number,
  ...portions: IMealDinnersPortionsMacro['dinnerProductsPortions'][]
) => {
  const result: Array<ICartesianResult> = [];
  const max = portions.length - 1;
  let loop = 0;
  console.log(loop);

  const helper = (
    arr: Array<IMealDinnersPortionsMacro['dinnerProductsPortions'][0]>,
    i: number
  ) => {
    for (let j = 0, l = portions[i].length; j < l; j++) {
      const a = arr.slice(0); // clone arr
      a.push(portions[i][j]);

      if (i == max) {
        loop = loop + 1;

        if (result.length === 100000) {
          return;
        }

        const macroTotalCount = cartesianGroupTotalCount(a); //correct

        const missingProcentCount = cartesianGroupMissingProcentCount(
          macroTotalCount,
          mealEstablishment,
          dietEstablishment
        );

        const cartesianProductGroup = {
          products: a,
          macroTotalCount,
          missingProcentCount,
        };

        if (
          Math.abs(missingProcentCount.missingKcalProcent) <= currentProcent
        ) {
          return result.push(cartesianProductGroup);
        }
      } else {
        helper(a, i + 1);
      }
    }
  };

  helper([], 0);

  return result;
};

type MacroForPortions = IMealDinnersPortionsMacro['dinnerProductsPortions'];

const cartesianGroupTotalCount = (groups: MacroForPortions) => {
  const total_kcal = roundMacro(
    countCartesianMacroTotal(groups, 'portionKcal')
  );
  const total_gram = roundMacro(countCartesianMacroTotal(groups, 'portion'));
  const total_protein_gram = roundMacro(
    countCartesianMacroTotal(groups, 'portionProteinGram')
  );
  const total_protein_kcal = roundMacro(total_protein_gram * 4);
  const total_protein_procent = roundMacro(
    (total_protein_kcal * 100) / total_kcal
  );

  const total_fat_gram = roundMacro(
    countCartesianMacroTotal(groups, 'portionFatGram')
  );
  const total_fat_kcal = roundMacro(total_fat_gram * 9);
  const total_fat_procent = roundMacro((total_fat_kcal * 100) / total_kcal);

  const total_carbohydrates_gram = roundMacro(
    countCartesianMacroTotal(groups, 'portionCarbohydratesGram')
  );
  const total_carbohydrates_kcal = roundMacro(total_carbohydrates_gram * 4);
  const total_carbohydrates_procent = roundMacro(
    (total_carbohydrates_kcal * 100) / total_kcal
  );

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

type TotalMacro = ReturnType<typeof cartesianGroupTotalCount>;

const countCartesianMacroTotal = (
  groups: MacroForPortions,
  key: keyof MacroForPortions[0]
) => {
  const total = groups.reduce((acc, field) => acc + Number(field[key]), 0);
  return total;
};

export const cartesianGroupMissingProcentCount = (
  macroTotalCount: TotalMacro,
  mealEstablishment: IDietEstablishmentDocument['meals'][0],
  dietEstablishment: IDietEstablishmentDocument
) => {
  const kcal = mealEstablishment.kcal;

  const dietProteinProcent = dietEstablishment.protein.procent;
  const dietFatProcent = dietEstablishment.fat.procent;
  const dietCarbohydratesProcent = dietEstablishment.carbohydrates.procent;

  const mealProteinKcal = roundMacro((dietProteinProcent * kcal) / 100);
  const mealProteinGram = roundMacro(mealProteinKcal / 4);
  const mealFatKcal = roundMacro((dietFatProcent * kcal) / 100);
  const mealFatGram = roundMacro(mealFatKcal / 9);
  const mealCarbohydratesKcal = roundMacro(
    (dietCarbohydratesProcent * kcal) / 100
  );
  const mealCarbohydratesGram = roundMacro(mealCarbohydratesKcal / 4);

  // const proteinGram = mealEstablishment.protein.gram;
  // const fatGram = mealEstablishment.fat.gram;
  // const carbohydratesGram = mealEstablishment.carbohydrates.gram;

  const missingKcal = roundMacro(kcal - macroTotalCount.total_kcal);

  const missingProteinGram = roundMacro(
    mealProteinGram - macroTotalCount.total_protein_gram
  );

  const missingFatGram = roundMacro(
    mealFatGram - macroTotalCount.total_fat_gram
  );

  const missingCarbohydratesGram = roundMacro(
    mealCarbohydratesGram - macroTotalCount.total_carbohydrates_gram
  );

  //missing procent
  const missingKcalProcent = roundMacro((missingKcal * 100) / kcal);

  const missingProteinProcent = roundMacro(
    (missingProteinGram * 100) / mealProteinGram
  );

  const missingFatProcent = roundMacro((missingFatGram * 100) / mealFatGram);
  const missingCarbohydratesProcent = roundMacro(
    (missingCarbohydratesGram * 100) / mealCarbohydratesGram
  );

  const allMacroMissingProcent = () => {
    const sum =
      Math.abs(missingProteinProcent) +
      Math.abs(missingFatProcent) +
      Math.abs(missingCarbohydratesProcent);

    return sum;
  };

  const proteinPerfectPercentageRange =
    macroTotalCount.total_protein_procent >=
      dietEstablishment.protein.min_procent &&
    macroTotalCount.total_protein_procent <=
      dietEstablishment.protein.max_procent;

  const fatPerfectPercentageRange =
    macroTotalCount.total_fat_procent >= dietEstablishment.fat.min_procent &&
    macroTotalCount.total_fat_procent <= dietEstablishment.fat.max_procent;

  const carbohydratesPerfectPercentageRange =
    macroTotalCount.total_carbohydrates_procent >=
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

type MissingMacroProcent = ReturnType<typeof cartesianGroupMissingProcentCount>;

export const roundMacro = (macro: number) => {
  return Math.round(macro * 1e2) / 1e2;
};

// type ICartesianResult = DinnerPortionsMacro["dinnerProductsPortions"][0];

export interface ICartesianResult {
  products: MacroForPortions;
  macroTotalCount: TotalMacro;
  missingProcentCount: MissingMacroProcent;
}
