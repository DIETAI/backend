import mongoose from 'mongoose';
import { IDinnerDocument } from '../interfaces/dinners.interfaces';

const Schema = mongoose.Schema;

const DinnerSchema = new Schema<IDinnerDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    image: { type: String },
    gallery: [{ type: String }],
    mealTypes: [{ type: String }],
    mealTypesKind: [{ type: String }],
    description: { type: String },
    recipe: { type: String },
    dietKinds: [{ type: String }],
    tags: [{ type: String }],
    products: [
      {
        productId: { type: String, required: true },
        defaultAmount: { type: Number, required: true },
        minAmount: { type: Number },
        maxAmount: { type: Number },
        portionsGram: [{ type: Number }],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const DinnerModel = mongoose.model<IDinnerDocument>('Dinner', DinnerSchema);

export default DinnerModel;
