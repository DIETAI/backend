import mongoose from 'mongoose';
import { IDinnerDocument } from '../../interfaces/dinners/dinners.interfaces';

const Schema = mongoose.Schema;

const DinnerSchema = new Schema<IDinnerDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    image: { type: String },
    gallery: [{ type: String }],
    mealTypes: [{ type: String, required: true }],
    mealTypesKind: { type: String, required: true },
    description: { type: String },
    recipe: { type: String },
    preparation_time: { type: String },
    dietKindsExclude: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'DietKind' },
    ],
    tags: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const DinnerModel = mongoose.model<IDinnerDocument>('Dinner', DinnerSchema);

export default DinnerModel;
