import mongoose from 'mongoose';
import { ISubscriptionPlanDocument } from '../../interfaces/subscriptionPlan/subscriptionPlan.interfaces';

const Schema = mongoose.Schema;

const SubscriptionPlanSchema = new Schema<ISubscriptionPlanDocument>(
  {
    stripeId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
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
    variants: {
      required: true,
      type: [
        {
          stripePriceId: { type: String, required: true },
          name: { type: String, required: true },
          time: { type: String, required: true },
          price: { type: Number, required: true },
          salePrice: { type: Number },
        },
      ],
    },
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
