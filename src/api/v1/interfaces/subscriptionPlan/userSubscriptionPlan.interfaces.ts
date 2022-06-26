import mongoose from 'mongoose';
import { IUserDocument } from '../user.interfaces';
import { ISubscriptionPlanDocument } from './subscriptionPlan.interfaces';

export interface IUserSubscriptionPlanInput {
  user: IUserDocument['_id'];
  subscriptionPlan: ISubscriptionPlanDocument['_id'];
  start: Date;
  end: Date;
  valid: boolean;
  transactionId?: string;
}

export interface IUserSubscriptionPlanDocument
  extends IUserSubscriptionPlanInput,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
