//funkcja zliczania meal_dinners lub day_meals (może być wykorzystywana przez dietMeal, oraz dietDay);

//przekazywane jako arg są dietMealDinners, dietDayMeals lub dietDays

interface IMacrohydratesTotal {
  procent: number;
  gram: number;
  kcal: number;
}

export interface ITotal {
  kcal: number;
  protein: IMacrohydratesTotal;
  fat: IMacrohydratesTotal;
  carbohydrates: IMacrohydratesTotal;
  fiber: Omit<IMacrohydratesTotal, 'procent'>;
}

interface IItem {
  //   documentType: 'mealDinner' | 'dayMeal';
  total: ITotal;
}

interface IMealTotalProcent {
  mealTotalKcal: number;
  dayTotalKcal: number;
}

const round2 = (value: number) => {
  return Math.round(value * 1e2) / 1e2;
};

export const getMealTotalProcent = ({
  mealTotalKcal,
  dayTotalKcal,
}: IMealTotalProcent) => {
  return round2((mealTotalKcal * 100) / dayTotalKcal);
};

//items to wartości total dietDinners lub dietMeals
//przy zmianie dietMealTotal dodać jeszcze procent
export const getTotal = async (items: IItem[]): Promise<ITotal> => {
  //kcal
  const totalKcal = items.reduce(
    (acc, field) => acc + Number(field.total.kcal),
    0
  );

  //protein
  const totalProteinGram = items.reduce(
    (acc, field) => acc + Number(field.total.protein.gram),
    0
  );

  const totalProteinKcal = items.reduce(
    (acc, field) => acc + Number(field.total.protein.gram),
    0
  );

  const proteinProcent = round2((totalProteinKcal * 100) / totalKcal);

  //fat
  const totalFatGram = items.reduce(
    (acc, field) => acc + Number(field.total.fat.gram),
    0
  );

  const totalFatKcal = items.reduce(
    (acc, field) => acc + Number(field.total.fat.gram),
    0
  );

  const fatProcent = round2((totalFatKcal * 100) / totalKcal);

  //carbohydrates
  const totalCarbohydratesGram = items.reduce(
    (acc, field) => acc + Number(field.total.carbohydrates.gram),
    0
  );

  const totalCarbohydratesKcal = items.reduce(
    (acc, field) => acc + Number(field.total.carbohydrates.gram),
    0
  );

  const carbohydratesProcent = round2(
    (totalCarbohydratesKcal * 100) / totalKcal
  );

  //fiber
  const totalFiberGram = items.reduce(
    (acc, field) => acc + Number(field.total.fiber.gram),
    0
  );

  const totalFiberKcal = items.reduce(
    (acc, field) => acc + Number(field.total.fiber.gram),
    0
  );

  const totalValues: ITotal = {
    kcal: totalKcal,
    protein: {
      gram: totalProteinGram,
      kcal: totalProteinKcal,
      procent: proteinProcent,
    },
    fat: {
      gram: totalFatGram,
      kcal: totalFatKcal,
      procent: fatProcent,
    },
    carbohydrates: {
      gram: totalCarbohydratesGram,
      kcal: totalCarbohydratesKcal,
      procent: carbohydratesProcent,
    },
    fiber: {
      gram: totalFiberGram,
      kcal: totalFiberKcal,
    },
  };

  return totalValues;
};
