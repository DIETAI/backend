import mongoose from 'mongoose';
import { IUserDocument } from '../user.interfaces';
import { IProductDocument } from '../products.interfaces';
import { IDinnerDocument } from './dinners.interfaces';
import { IDinnerProductDocument } from './dinnerProducts.interfaces';
import { ITotal } from '../total/totalCount.interfaces';

// interface ITotal {
//   kcal?: number;
// }

type IDinnerPortionType = 'default' | 'custom';

export interface IDinnerProductPortion {
  dinnerProductId: IDinnerProductDocument['_id'];
  portion: number;
  total: ITotal;
}

export interface IDinnerPortionInput {
  user: IUserDocument['_id'];
  dinnerId: IDinnerDocument['_id'];
  dinnerProducts: IDinnerProductPortion[];
  total: ITotal;
  type: IDinnerPortionType;
}

export interface IDinnerPortionDocument
  extends IDinnerPortionInput,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
