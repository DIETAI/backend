import { ITotal } from '../interfaces/total/totalCount.interfaces';
import { IDinnerProductPortion } from '../interfaces/dinners/dinnerPortions.interfaces';

interface ISumNutrientArgs {
  dinnerPortionProducts: IDinnerProductPortion[];
}

// const sumNutrients = ({ dinnerPortionProducts }: ISumNutrientArgs) => {
//   const sum = dinnerPortionProducts.reduce(
//     (acc, field) => acc + Number(field.total),
//     0
//   );

//   const nutrientValue = (nutrientAmount * portion) / 100;
//   return Math.round(nutrientValue * 1e2) / 1e2;
// };

const roundValue = (value: number) => {
  return Math.round(value * 1e2) / 1e2;
};

export const sumTotal = ({ dinnerPortionProducts }: ISumNutrientArgs) => {
  const sumValuesObj: ITotal = {
    //macrohydrates
    protein: {
      gram: roundValue(
        dinnerPortionProducts.reduce(
          (acc, field) => acc + Number(field.total.protein.gram),
          0
        )
      ),
      kcal: roundValue(
        dinnerPortionProducts.reduce(
          (acc, field) => acc + Number(field.total.protein.kcal),
          0
        )
      ),
    },
    fat: {
      gram: roundValue(
        dinnerPortionProducts.reduce(
          (acc, field) => acc + Number(field.total.fat.gram),
          0
        )
      ),
      kcal: roundValue(
        dinnerPortionProducts.reduce(
          (acc, field) => acc + Number(field.total.protein.kcal),
          0
        )
      ),
    },
    carbohydrates: {
      gram: roundValue(
        dinnerPortionProducts.reduce(
          (acc, field) => acc + Number(field.total.carbohydrates.gram),
          0
        )
      ),
      kcal: roundValue(
        dinnerPortionProducts.reduce(
          (acc, field) => acc + Number(field.total.carbohydrates.kcal),
          0
        )
      ),
    },
    digestableCarbohydrates: {
      gram: roundValue(
        dinnerPortionProducts.reduce(
          (acc, field) =>
            acc + Number(field.total.digestableCarbohydrates.gram),
          0
        )
      ),
      kcal: roundValue(
        dinnerPortionProducts.reduce(
          (acc, field) =>
            acc + Number(field.total.digestableCarbohydrates.kcal),
          0
        )
      ),
    },
    fiber: {
      gram: roundValue(
        dinnerPortionProducts.reduce(
          (acc, field) => acc + Number(field.total.fiber.gram),
          0
        )
      ),
      kcal: roundValue(
        dinnerPortionProducts.reduce(
          (acc, field) => acc + Number(field.total.fiber.kcal),
          0
        )
      ),
    },
    //   animalProtein?: IMacrohydrate;
    //   vegetableProtein?: IMacrohydrate;
    carbohydrateExchangers: 5,
    proteinFatExchangers: 5,
    kcal: roundValue(
      dinnerPortionProducts.reduce(
        (acc, field) => acc + Number(field.total.kcal),
        0
      )
    ),
    //fattyAcids
    saturatedFattyAcids:
      roundValue(
        dinnerPortionProducts.reduce(
          (acc, field) => acc + Number(field.total.saturatedFattyAcids),
          0
        )
      ) || undefined,
    pollyunsaturatedFattyAcids:
      roundValue(
        dinnerPortionProducts.reduce(
          (acc, field) => acc + Number(field.total.pollyunsaturatedFattyAcids),
          0
        )
      ) || undefined,
    pollyunsaturatedFattyAcidsOmega3:
      roundValue(
        dinnerPortionProducts.reduce(
          (acc, field) =>
            acc + Number(field.total.pollyunsaturatedFattyAcidsOmega3),
          0
        )
      ) || undefined,
    pollyunsaturatedFattyAcidsOmega6:
      roundValue(
        dinnerPortionProducts.reduce(
          (acc, field) =>
            acc + Number(field.total.pollyunsaturatedFattyAcidsOmega6),
          0
        )
      ) || undefined,
    monounsaturatedFattyAcids:
      roundValue(
        dinnerPortionProducts.reduce(
          (acc, field) => acc + Number(field.total.monounsaturatedFattyAcids),
          0
        )
      ) || undefined,
    //vitamins
    vitaminA: {
      amount:
        roundValue(
          dinnerPortionProducts.reduce(
            (acc, field) => acc + Number(field.total.vitaminA?.amount),
            0
          )
        ) || undefined,
    },
    vitaminB1: {
      amount:
        roundValue(
          dinnerPortionProducts.reduce(
            (acc, field) => acc + Number(field.total.vitaminB1?.amount),
            0
          )
        ) || undefined,
    },
    vitaminB2: {
      amount:
        roundValue(
          dinnerPortionProducts.reduce(
            (acc, field) => acc + Number(field.total.vitaminB2?.amount),
            0
          )
        ) || undefined,
    },
    vitaminB5: {
      amount:
        roundValue(
          dinnerPortionProducts.reduce(
            (acc, field) => acc + Number(field.total.vitaminB5?.amount),
            0
          )
        ) || undefined,
    },
    vitaminB6: {
      amount:
        roundValue(
          dinnerPortionProducts.reduce(
            (acc, field) => acc + Number(field.total.vitaminB6?.amount),
            0
          )
        ) || undefined,
    },
    vitaminB12: {
      amount:
        roundValue(
          dinnerPortionProducts.reduce(
            (acc, field) => acc + Number(field.total.vitaminB12?.amount),
            0
          )
        ) || undefined,
    },
    biotin: {
      amount:
        roundValue(
          dinnerPortionProducts.reduce(
            (acc, field) => acc + Number(field.total.biotin?.amount),
            0
          )
        ) || undefined,
    },
    folicAcid: {
      amount:
        roundValue(
          dinnerPortionProducts.reduce(
            (acc, field) => acc + Number(field.total.folicAcid?.amount),
            0
          )
        ) || undefined,
    },
    vitaminC: {
      amount:
        roundValue(
          dinnerPortionProducts.reduce(
            (acc, field) => acc + Number(field.total.vitaminC?.amount),
            0
          )
        ) || undefined,
    },
    vitaminD: {
      amount:
        roundValue(
          dinnerPortionProducts.reduce(
            (acc, field) => acc + Number(field.total.vitaminD?.amount),
            0
          )
        ) || undefined,
    },
    vitaminE: {
      amount:
        roundValue(
          dinnerPortionProducts.reduce(
            (acc, field) => acc + Number(field.total.vitaminE?.amount),
            0
          )
        ) || undefined,
    },
    vitaminPP: {
      amount:
        roundValue(
          dinnerPortionProducts.reduce(
            (acc, field) => acc + Number(field.total.vitaminPP?.amount),
            0
          )
        ) || undefined,
    },
    vitaminK: {
      amount:
        roundValue(
          dinnerPortionProducts.reduce(
            (acc, field) => acc + Number(field.total.vitaminK?.amount),
            0
          )
        ) || undefined,
    },
    //minerals
    zinc: {
      amount:
        roundValue(
          dinnerPortionProducts.reduce(
            (acc, field) => acc + Number(field.total.zinc?.amount),
            0
          )
        ) || undefined,
    },
    phosphorus: {
      amount:
        roundValue(
          dinnerPortionProducts.reduce(
            (acc, field) => acc + Number(field.total.phosphorus?.amount),
            0
          )
        ) || undefined,
    },
    magnesium: {
      amount:
        roundValue(
          dinnerPortionProducts.reduce(
            (acc, field) => acc + Number(field.total.magnesium?.amount),
            0
          )
        ) || undefined,
    },
    copper: {
      amount:
        roundValue(
          dinnerPortionProducts.reduce(
            (acc, field) => acc + Number(field.total.copper?.amount),
            0
          )
        ) || undefined,
    },
    potassium: {
      amount:
        roundValue(
          dinnerPortionProducts.reduce(
            (acc, field) => acc + Number(field.total.potassium?.amount),
            0
          )
        ) || undefined,
    },
    selenium: {
      amount:
        roundValue(
          dinnerPortionProducts.reduce(
            (acc, field) => acc + Number(field.total.selenium?.amount),
            0
          )
        ) || undefined,
    },
    sodium: {
      amount:
        roundValue(
          dinnerPortionProducts.reduce(
            (acc, field) => acc + Number(field.total.sodium?.amount),
            0
          )
        ) || undefined,
    },
    calcium: {
      amount:
        roundValue(
          dinnerPortionProducts.reduce(
            (acc, field) => acc + Number(field.total.calcium?.amount),
            0
          )
        ) || undefined,
    },
    iron: {
      amount:
        roundValue(
          dinnerPortionProducts.reduce(
            (acc, field) => acc + Number(field.total.iron?.amount),
            0
          )
        ) || undefined,
    },
  };

  return sumValuesObj;
};
