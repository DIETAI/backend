import mongoose from 'mongoose';
import { IAssetDocument } from '../assets.interfaces';

export interface ISubscriptionPlanFeature {
  name: string;
}

export interface ISubscriptionPlanInput {
  name: 'test' | 'standard' | 'pro' | 'vip';
  roles: ('admin' | 'patient' | 'dietetic' | 'personal')[];
  shortDescription?: string;
  description?: string;
  price: number;
  salePrice?: number;
  image: IAssetDocument['_id'];
  features?: ISubscriptionPlanFeature[];
}

export interface ISubscriptionPlanDocument
  extends ISubscriptionPlanInput,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
