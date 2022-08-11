import mongoose from 'mongoose';
import { IDietDocument } from './diet.interfaces';
import { IUserDocument } from '../user.interfaces';

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

export interface IDietDayInput {
  user: IUserDocument['_id'];
  dietId: IDietDocument['_id'];
  establishmentId: IDietDocument['_id'];
  date?: Date;
  name?: string;
  order: number;
  total: ITotal;
}

export interface IDietDayDocument extends IDietDayInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
