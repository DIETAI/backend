import mongoose from 'mongoose';
import { IUserDocument } from '../user.interfaces';
import { IDietDayDocument } from './dietDay.interfaces';
import { IDietDocument } from './diet.interfaces';

import {
  IDietEstablishmentMeal,
  IDietEstablishmentMacrohydrate,
  IDietEstablishmentVitamin,
  IDietEstablishmentMinerals,
  IDietEstablishmentDocument,
} from '../dietEstablishments.interfaces';

export interface IMacrohydratesTotal {
  procent: number;
  gram: number;
  kcal: number;
}

export interface ITotal {
  kcal: number;
  procent: number;
  protein: IMacrohydratesTotal;
  fat: IMacrohydratesTotal;
  carbohydrates: IMacrohydratesTotal;
  fiber: Omit<IMacrohydratesTotal, 'procent'>;
}

export interface IMealValues extends IDietEstablishmentMeal {
  kcal: number;
  procent: number;
  //macrohydrates
  protein: IDietEstablishmentMacrohydrate;
  fat: IDietEstablishmentMacrohydrate;
  carbohydrates: IDietEstablishmentMacrohydrate;
  // digestableCarbohydrates: Omit<IDietEstablishmentMacrohydrate, 'procent'>;
  fiber: Omit<IDietEstablishmentMacrohydrate, 'procent'>;
  // animalProtein?: IDietEstablishmentMacrohydrate;
  // vegetableProtein?: IDietEstablishmentMacrohydrate;
  // carbohydrateExchangers: number;
  // proteinFatExchangers: number;
  // //fattyAcids
  // saturatedFattyAcids?: number;
  // pollyunsaturatedFattyAcids?: number;
  // pollyunsaturatedFattyAcidsOmega3?: number;
  // pollyunsaturatedFattyAcidsOmega6?: number;
  // monounsaturatedFattyAcids?: number;
  // //vitamins
  // vitaminA?: IDietEstablishmentVitamin;
  // vitaminB2?: IDietEstablishmentVitamin;
  // vitaminB5?: IDietEstablishmentVitamin;
  // vitaminB6?: IDietEstablishmentVitamin;
  // vitaminB12?: IDietEstablishmentVitamin;
  // biotin?: IDietEstablishmentVitamin;
  // folicAcid?: IDietEstablishmentVitamin;
  // vitaminC?: IDietEstablishmentVitamin;
  // vitaminD?: IDietEstablishmentVitamin;
  // vitaminE?: IDietEstablishmentVitamin;
  // vitaminPP?: IDietEstablishmentVitamin;
  // vitaminK?: IDietEstablishmentVitamin;
  // //minerals
  // zinc?: IDietEstablishmentMinerals;
  // phosphorus?: IDietEstablishmentMinerals;
  // magnesium?: IDietEstablishmentMinerals;
  // copper?: IDietEstablishmentMinerals;
  // potassium?: IDietEstablishmentMinerals;
  // selenium?: IDietEstablishmentMinerals;
  // sodium?: IDietEstablishmentMinerals;
  // calcium?: IDietEstablishmentMinerals;
  // iron?: IDietEstablishmentMinerals;
}

type MealType = 'breakfast' | 'second_breakfast' | 'lunch' | 'snack' | 'dinner';

export interface IDietMealInput {
  user: IUserDocument['_id'];
  dietId: IDietDocument['_id'];
  dayId: IDietDayDocument['_id'];
  // establishments: IMealValues;
  establishmentMealId: string;
  name: string;
  type: MealType;
  total: ITotal;
  order: number;
}

export interface IDietMealDocument extends IDietMealInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
