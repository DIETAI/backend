import mongoose from 'mongoose';
import { IUserDocument } from './user.interfaces';
import { IProductDocument } from './products.interfaces';

export interface IDinnerProduct {
  productId: IProductDocument['_id'];
  defaultAmount: number;
  minAmount?: number;
  maxAmount?: number;
  portionsGram?: number[];
}

export interface IDinnerInput {
  user: IUserDocument['_id'];
  name: string;
  image?: string;
  gallery?: string[];
  mealTypes?: (
    | 'breakfast'
    | 'dinner'
    | 'second_breakfast'
    | 'lunch'
    | 'snack'
  )[];
  mealTypesKind?: 'soup' | 'mainCourse' | 'drink';
  description?: string;
  recipe?: string;
  dietKinds?: string[];
  tags?: string[];
  preparation_time?: string;
  products: IDinnerProduct[];
}

export interface IDinnerDocument extends IDinnerInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
