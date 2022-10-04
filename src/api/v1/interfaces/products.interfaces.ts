import mongoose from 'mongoose';
import { IUserDocument } from './user.interfaces';
import { IAssetDocument } from './assets.interfaces';
import { IDietKindDocument } from './dietKind/dietKind.interfaces';

export interface IMacrohydrate {
  gram: number;
  kcal: number;
}

export interface IMicrohydrate {
  amount?: number;
  unit?: 'mg' | 'uq' | 'j.';
}

export type IMeasureType =
  | 'porcja'
  | 'sztuka'
  | 'szklanka'
  | 'łyżka'
  | 'łyżeczka'
  | 'garść'
  | 'opakowanie'
  | 'plaster'
  | 'ząbek'
  | 'kostka';

export interface IMeasure {
  type: IMeasureType;
  amount: number;
  unit: 'g' | 'ml';
}

export interface IPrice {
  shop: string;
  price: number;
  currency: 'PLN' | 'USD' | 'EUR';
}

export interface IProductInput {
  user: IUserDocument['_id'];
  name: string;
  description?: string;
  subGroupId?: string;
  measureUnit: 'g' | 'l';
  dietKindsExclude?: IDietKindDocument['_id'][];
  tags?: string[];
  season?: 'zima' | 'wiosna' | 'lato' | 'jesień';
  image?: IAssetDocument['_id'];
  gallery?: IAssetDocument['_id'][];
  //macrohydrates
  protein: IMacrohydrate;
  fat: IMacrohydrate;
  carbohydrates: IMacrohydrate;
  digestableCarbohydrates: IMacrohydrate;
  fiber: IMacrohydrate;
  animalProtein?: IMacrohydrate;
  vegetableProtein?: IMacrohydrate;
  carbohydrateExchangers: number;
  proteinFatExchangers: number;
  kcal: number;
  //fattyAcids
  saturatedFattyAcids?: number;
  pollyunsaturatedFattyAcids?: number;
  pollyunsaturatedFattyAcidsOmega3?: number;
  pollyunsaturatedFattyAcidsOmega6?: number;
  monounsaturatedFattyAcids?: number;
  //vitamins
  vitaminA?: IMicrohydrate;
  vitaminB1?: IMicrohydrate;
  vitaminB2?: IMicrohydrate;
  vitaminB5?: IMicrohydrate;
  vitaminB6?: IMicrohydrate;
  vitaminB12?: IMicrohydrate;
  biotin?: IMicrohydrate;
  folicAcid?: IMicrohydrate;
  vitaminC?: IMicrohydrate;
  vitaminD?: IMicrohydrate;
  vitaminE?: IMicrohydrate;
  vitaminPP?: IMicrohydrate;
  vitaminK?: IMicrohydrate;
  //minerals
  zinc?: IMicrohydrate;
  phosphorus?: IMicrohydrate;
  magnesium?: IMicrohydrate;
  copper?: IMicrohydrate;
  potassium?: IMicrohydrate;
  selenium?: IMicrohydrate;
  sodium?: IMicrohydrate;
  calcium?: IMicrohydrate;
  iron?: IMicrohydrate;
  //measures
  measures: IMeasure[];
  //prices
  prices: IPrice[];
}

export interface IProductDocument extends IProductInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
