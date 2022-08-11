import { IDietDayDocument } from '../../interfaces/diet/dietDay.interfaces';
import { IDietMealDocument } from '../../interfaces/diet/dietMeal.interfaces';

const roundValue = (value: number) => {
  return Math.round(value * 1e2) / 1e2;
};

interface ISumTotal {
  dietMeals: IDietMealDocument[];
}

export const sumDietDayMealsTotal = ({ dietMeals }: ISumTotal) => {
  console.log(dietMeals);

  const kcal = roundValue(
    dietMeals.reduce((acc, field) => acc + Number(field.total.kcal), 0)
  );

  //protein
  const proteinGram = roundValue(
    dietMeals.reduce((acc, field) => acc + Number(field.total.protein.gram), 0)
  );

  const proteinKcal = roundValue(
    dietMeals.reduce((acc, field) => acc + Number(field.total.protein.kcal), 0)
  );

  const proteinProcent = roundValue((proteinKcal * 100) / kcal) || 0;

  //fat
  const fatGram = roundValue(
    dietMeals.reduce((acc, field) => acc + Number(field.total.fat.gram), 0)
  );

  const fatKcal = roundValue(
    dietMeals.reduce((acc, field) => acc + Number(field.total.fat.kcal), 0)
  );

  const fatProcent = roundValue((fatKcal * 100) / kcal) || 0;

  //carbohydrates
  const carbohydratesGram = roundValue(
    dietMeals.reduce(
      (acc, field) => acc + Number(field.total.carbohydrates.gram),
      0
    )
  );

  const carbohydratesKcal = roundValue(
    dietMeals.reduce(
      (acc, field) => acc + Number(field.total.carbohydrates.kcal),
      0
    )
  );

  const carbohydratesProcent =
    roundValue((carbohydratesKcal * 100) / kcal) || 0;

  //fiber
  const fiberGram = roundValue(
    dietMeals.reduce((acc, field) => acc + Number(field.total.fiber.gram), 0)
  );

  const fiberKcal = roundValue(
    dietMeals.reduce((acc, field) => acc + Number(field.total.fiber.kcal), 0)
  );

  const dayTotal: IDietDayDocument['total'] = {
    kcal,
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

  return dayTotal;
};
