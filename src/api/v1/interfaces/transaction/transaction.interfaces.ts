import mongoose from 'mongoose';
import { IAssetDocument } from '../assets.interfaces';
import { IUserDocument } from '../user.interfaces';
import { ISubscriptionPlanDocument } from '../subscriptionPlan/subscriptionPlan.interfaces';

export interface ITransactionInput {
  user: IUserDocument['_id'];
  subscriptionPlan: ISubscriptionPlanDocument['_id'];
  subscriptionPlanVariant: '1month' | '3months' | '6months';
  dateStart: Date;
  dateEnd: Date;
  valid: boolean;
}

export interface ITransactionDocument
  extends ITransactionInput,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
