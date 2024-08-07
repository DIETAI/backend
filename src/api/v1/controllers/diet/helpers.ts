import { IDietDinnerDocument } from '../../interfaces/diet/dietDinner.interfaces';
import { IDietMealDocument } from '../../interfaces/diet/dietMeal.interfaces';
import { IDinnerPortionDocument } from '../../interfaces/dinners/dinnerPortions.interfaces';

interface IDietDinnerProductQuery extends IDietDinnerDocument {
  dinnerPortion: IDinnerPortionDocument;
}

const roundValue = (value: number) => {
  return Math.round(value * 1e2) / 1e2;
};

interface ISumTotal {
  dietDinners?: IDietDinnerProductQuery[];
  dietDayTotalKcal: number;
}

export const sumDietDinnersTotal = ({
  dietDinners,
  dietDayTotalKcal,
}: ISumTotal) => {
  const kcal = roundValue(
    dietDinners?.reduce(
      (acc, field) => acc + Number(field.dinnerPortion.total.kcal),
      0
    ) || 0
  );

  //protein
  const proteinGram = roundValue(
    dietDinners?.reduce(
      (acc, field) => acc + Number(field.dinnerPortion.total.protein.gram),
      0
    ) || 0
  );

  const proteinKcal = roundValue(
    dietDinners?.reduce(
      (acc, field) => acc + Number(field.dinnerPortion.total.protein.kcal),
      0
    ) || 0
  );

  const proteinProcent = roundValue((proteinKcal * 100) / kcal) || 0;

  //fat
  const fatGram = roundValue(
    dietDinners?.reduce(
      (acc, field) => acc + Number(field.dinnerPortion.total.fat.gram),
      0
    ) || 0
  );

  const fatKcal = roundValue(
    dietDinners?.reduce(
      (acc, field) => acc + Number(field.dinnerPortion.total.fat.kcal),
      0
    ) || 0
  );

  const fatProcent = roundValue((fatKcal * 100) / kcal) || 0;

  //carbohydrates
  const carbohydratesGram = roundValue(
    dietDinners?.reduce(
      (acc, field) =>
        acc + Number(field.dinnerPortion.total.carbohydrates.gram),
      0
    ) || 0
  );

  const carbohydratesKcal = roundValue(
    dietDinners?.reduce(
      (acc, field) =>
        acc + Number(field.dinnerPortion.total.carbohydrates.kcal),
      0
    ) || 0
  );

  const carbohydratesProcent =
    roundValue((carbohydratesKcal * 100) / kcal) || 0;

  //fiber
  const fiberGram = roundValue(
    dietDinners?.reduce(
      (acc, field) => acc + Number(field.dinnerPortion.total.fiber.gram),
      0
    ) || 0
  );

  const fiberKcal = roundValue(
    dietDinners?.reduce(
      (acc, field) => acc + Number(field.dinnerPortion.total.fiber.kcal),
      0
    ) || 0
  );

  const mealTotal: IDietMealDocument['total'] = {
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
