import mongoose from 'mongoose';
import { IAssetDocument } from '../assets.interfaces';

export interface ISubscriptionPlanFeature {
  name: string;
}

export interface ISubscriptionPlanVariant {
  name: string;
  time: '1month' | '3months' | '6months';
  price: number;
  salePrice?: number;
  stripePriceId: string;
}

export interface ISubscriptionPlanInput {
  stripeId: string;
  name: 'test' | 'standard' | 'pro' | 'vip';
  role: 'admin' | 'patient' | 'dietetic' | 'personal';
  // roles: ('admin' | 'patient' | 'dietetic' | 'personal')[];
  shortDescription?: string;
  description?: string;
  price: number;
  salePrice?: number;
  image: IAssetDocument['_id'];
  features?: ISubscriptionPlanFeature[];
  variants: ISubscriptionPlanVariant[];
}

export interface ISubscriptionPlanDocument
  extends ISubscriptionPlanInput,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
