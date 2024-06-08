import { IProductDocument } from '../interfaces/products.interfaces';
import { ITotal } from '../interfaces/total/totalCount.interfaces';

interface ICountNutrientArgs {
  nutrientAmount: number;
  portion: number;
}

const countNutrient = ({ nutrientAmount, portion }: ICountNutrientArgs) => {
  const nutrientValue = (nutrientAmount * portion) / 100;
  return Math.round(nutrientValue * 1e2) / 1e2;
};

interface ICountTotalArgs {
  product: IProductDocument;
  portion: number;
}

export const countTotal = ({ product, portion }: ICountTotalArgs) => {
  const countValuesObj: ITotal = {
    //macrohydrates
    protein: {
      gram: countNutrient({
        nutrientAmount: product.protein.gram,
        portion,
      }),
      kcal: countNutrient({
        nutrientAmount: product.protein.kcal,
        portion,
      }),
    },
    fat: {
      gram: countNutrient({
        nutrientAmount: product.fat.gram,
        portion,
      }),
      kcal: countNutrient({
        nutrientAmount: product.fat.kcal,
        portion,
      }),
    },
    carbohydrates: {
      gram: countNutrient({
        nutrientAmount: product.carbohydrates.gram,
        portion,
      }),
      kcal: countNutrient({
        nutrientAmount: product.carbohydrates.kcal,
        portion,
      }),
    },
    digestableCarbohydrates: {
      gram: countNutrient({
        nutrientAmount: product.digestableCarbohydrates.gram,
        portion,
      }),
      kcal: countNutrient({
        nutrientAmount: product.digestableCarbohydrates.kcal,
        portion,
      }),
    },
    fiber: {
      gram: countNutrient({
        nutrientAmount: product.fiber.gram,
        portion,
      }),
      kcal: countNutrient({
        nutrientAmount: product.fiber.kcal,
        portion,
      }),
    },

    carbohydrateExchangers: 5,
    proteinFatExchangers: 5,
    kcal: countNutrient({
      nutrientAmount: product.kcal,
      portion,
    }),
    //fattyAcids
    saturatedFattyAcids:
      product.saturatedFattyAcids &&
      countNutrient({
        nutrientAmount: product.saturatedFattyAcids,
        portion,
      }),
    pollyunsaturatedFattyAcids:
      product.pollyunsaturatedFattyAcids &&
      countNutrient({
        nutrientAmount: product.pollyunsaturatedFattyAcids,
        portion,
      }),
    pollyunsaturatedFattyAcidsOmega3:
      product.pollyunsaturatedFattyAcidsOmega3 &&
      countNutrient({
        nutrientAmount: product.pollyunsaturatedFattyAcidsOmega3,
        portion,
      }),
    pollyunsaturatedFattyAcidsOmega6:
      product.pollyunsaturatedFattyAcidsOmega6 &&
      countNutrient({
        nutrientAmount: product.pollyunsaturatedFattyAcidsOmega6,
        portion,
      }),
    monounsaturatedFattyAcids:
      product.monounsaturatedFattyAcids &&
      countNutrient({
        nutrientAmount: product.monounsaturatedFattyAcids,
        portion,
      }),
    //vitamins
    vitaminA: {
      amount:
        product.vitaminA?.amount &&
        countNutrient({
          nutrientAmount: product.vitaminA.amount,
          portion,
        }),
    },
    vitaminB1: {
      amount:
        product.vitaminB1?.amount &&
        countNutrient({
          nutrientAmount: product.vitaminB1.amount,
          portion,
        }),
    },
    vitaminB2: {
      amount:
        product.vitaminB2?.amount &&
        countNutrient({
          nutrientAmount: product.vitaminB2.amount,
          portion,
        }),
    },
    vitaminB5: {
      amount:
        product.vitaminB5?.amount &&
        countNutrient({
          nutrientAmount: product.vitaminB5.amount,
          portion,
        }),
    },
    vitaminB6: {
      amount:
        product.vitaminB6?.amount &&
        countNutrient({
          nutrientAmount: product.vitaminB6.amount,
          portion,
        }),
    },
    vitaminB12: {
      amount:
        product.vitaminB12?.amount &&
        countNutrient({
          nutrientAmount: product.vitaminB12.amount,
          portion,
        }),
    },
    biotin: {
      amount:
        product.biotin?.amount &&
        countNutrient({
          nutrientAmount: product.biotin.amount,
          portion,
        }),
    },
    folicAcid: {
      amount:
        product.folicAcid?.amount &&
        countNutrient({
          nutrientAmount: product.folicAcid.amount,
          portion,
        }),
    },
    vitaminC: {
      amount:
        product.vitaminC?.amount &&
        countNutrient({
          nutrientAmount: product.vitaminC.amount,
          portion,
        }),
    },
    vitaminD: {
      amount:
        product.vitaminD?.amount &&
        countNutrient({
          nutrientAmount: product.vitaminD.amount,
          portion,
        }),
    },
    vitaminE: {
      amount:
        product.vitaminE?.amount &&
        countNutrient({
          nutrientAmount: product.vitaminE.amount,
          portion,
        }),
    },
    vitaminPP: {
      amount:
        product.vitaminPP?.amount &&
        countNutrient({
          nutrientAmount: product.vitaminPP.amount,
          portion,
        }),
    },
    vitaminK: {
      amount:
        product.vitaminK?.amount &&
        countNutrient({
          nutrientAmount: product.vitaminK.amount,
          portion,
        }),
    },
    //minerals
    zinc: {
      amount:
        product.zinc?.amount &&
        countNutrient({
          nutrientAmount: product.zinc.amount,
          portion,
        }),
    },
    phosphorus: {
      amount:
        product.phosphorus?.amount &&
        countNutrient({
          nutrientAmount: product.phosphorus.amount,
          portion,
        }),
    },
    magnesium: {
      amount:
        product.magnesium?.amount &&
        countNutrient({
          nutrientAmount: product.magnesium.amount,
          portion,
        }),
    },
    copper: {
      amount:
        product.copper?.amount &&
        countNutrient({
          nutrientAmount: product.copper.amount,
          portion,
        }),
    },
    potassium: {
      amount:
        product.potassium?.amount &&
        countNutrient({
          nutrientAmount: product.potassium.amount,
          portion,
        }),
    },
    selenium: {
      amount:
        product.selenium?.amount &&
        countNutrient({
          nutrientAmount: product.selenium.amount,
          portion,
        }),
    },
    sodium: {
      amount:
        product.sodium?.amount &&
        countNutrient({
          nutrientAmount: product.sodium.amount,
          portion,
        }),
    },
    calcium: {
      amount:
        product.calcium?.amount &&
        countNutrient({
          nutrientAmount: product.calcium.amount,
          portion,
        }),
    },
    iron: {
      amount:
        product.iron?.amount &&
        countNutrient({
          nutrientAmount: product.iron.amount,
          portion,
        }),
    },
  };

  return countValuesObj;
};
