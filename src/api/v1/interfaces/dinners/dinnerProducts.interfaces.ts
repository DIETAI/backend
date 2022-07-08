import mongoose from 'mongoose';
import { IUserDocument } from '../user.interfaces';
import { IProductDocument } from '../products.interfaces';
import { IDinnerDocument } from './dinners.interfaces';

export interface IDinnerProductInput {
  user: IUserDocument['_id'];
  dinnerId: IDinnerDocument['_id'];
  productId: IProductDocument['_id'];
  defaultAmount: number;
  minAmount?: number;
  maxAmount?: number;
  portionsGram?: number[];
}

export interface IDinnerProductDocument
  extends IDinnerProductInput,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
