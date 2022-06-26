import mongoose from 'mongoose';
import { IUserDocument } from '../user.interfaces';
import { IDietDocument } from './diet.interfaces';
import { IDietDayDocument } from './dietDay.interfaces';
import { IDietMealDocument } from './dietMeal.interfaces';
import { IDietDinnerDocument } from './dietDinner.interfaces';

export interface IMacrohydratesTotal {
  gram: number;
  kcal: number;
}

export interface IDietDinnerProductTotal {
  portionGram: number;
  portionKcal: number;
  protein: IMacrohydratesTotal;
  fat: IMacrohydratesTotal;
  carbohydrates: IMacrohydratesTotal;
  fiber: IMacrohydratesTotal;
}

export interface IDietDinnerProductInput {
  user: IUserDocument['_id'];
  dietId: IDietDocument['_id'];
  dayId: IDietDayDocument['_id'];
  mealId: IDietMealDocument['_id'];
  dietDinnerId: IDietDinnerDocument['_id'];
  dinnerProductId: string;
  // productName: string;
  selectedPortion: number;
  unit?: 'gram' | 'porcja';
  total: IDietDinnerProductTotal;
}

export interface IDietDinnerProductDocument
  extends IDietDinnerProductInput,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
