import mongoose from 'mongoose';
import { ISubscriptionPlanDocument } from '../../interfaces/subscriptionPlan/subscriptionPlan.interfaces';

const Schema = mongoose.Schema;

const SubscriptionPlanSchema = new Schema<ISubscriptionPlanDocument>(
  {
    name: { type: String, required: true },
    roles: [{ type: String, required: true }],
    shortDescription: { type: String },
    description: { type: String },
    price: { type: Number, required: true },
    salePrice: { type: Number },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Asset',
      required: true,
    },
    features: [
      {
        name: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const SubscriptionPlanModel = mongoose.model<ISubscriptionPlanDocument>(
  'SubscriptionPlan',
  SubscriptionPlanSchema
);

export default SubscriptionPlanModel;
