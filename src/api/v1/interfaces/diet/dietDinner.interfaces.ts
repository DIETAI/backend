import mongoose from 'mongoose';
import { IDietDocument } from './diet.interfaces';
import { IDietDayDocument } from './dietDay.interfaces';
import { IDietMealDocument } from './dietMeal.interfaces';
import { IUserDocument } from '../user.interfaces';
import { IDinnerDocument } from '../dinners/dinners.interfaces';
import { IDinnerPortionDocument } from '../dinners/dinnerPortions.interfaces';
import { IMealValues } from './dietMeal.interfaces';
import { IProductDocument } from '../products.interfaces';

export interface IMacrohydratesTotal {
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

export interface IDietDinnerProduct {
  productId: string;
  selectedPortionGram: number;
  total?: {
    kcal?: number;
  };
  // dayId: number;
  // mealId: string;
  // dinnerId: string;
  // databaseDinnerProductId: string;
  // productName: string;
  // selectedPortion: number;
  // unit?: 'gram' | 'porcja';

  // macrohydrates: {
  //   portionGram: number;
  //   portionKcal: number;
  //   portionCarbohydratesGram: number;
  //   portionCarbohydratesKcal: number;
  //   portionFatGram: number;
  //   portionFatKcal: number;
  //   portionProteinGram: number;
  //   portionProteinKcal: number;
  // };
}

export interface IDietDinnerInput {
  user: IUserDocument['_id'];
  dietId: IDietDocument['_id'];
  dayId: IDietDayDocument['_id'];
  dietMealId: IDietMealDocument['_id'];
  dinnerPortionId: IDinnerPortionDocument['_id']; //include dinnerProducts
  order: number;
  // dinnerAsProduct: boolean;
  // productId: IProductDocument["_id"]
  // productPortion: number;
}

export interface IDietDinnerDocument
  extends IDietDinnerInput,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
