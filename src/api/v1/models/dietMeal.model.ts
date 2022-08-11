import mongoose from 'mongoose';
import { IDietMealDocument } from '../interfaces/diet/dietMeal.interfaces';

const Schema = mongoose.Schema;

const DietMealSchema = new Schema<IDietMealDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    establishmentMealId: { type: String, required: true },
    dietId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Diet',
    },
    dayId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DietDay',
    },
    name: { type: String, required: true },
    type: { type: String, required: true },
    order: { type: Number, required: true },
    total: {
      required: true,
      type: {
        kcal: { type: Number },
        procent: { type: Number },
        protein: {
          gram: { type: Number },
          kcal: { type: Number },
          procent: { type: Number },
        },
        fat: {
          gram: { type: Number },
          kcal: { type: Number },
          procent: { type: Number },
        },
        carbohydrates: {
          gram: { type: Number },
          kcal: { type: Number },
          procent: { type: Number },
        },
        fiber: {
          gram: { type: Number },
          kcal: { type: Number },
        },
      },
    },
  },

  {
    timestamps: true,
  }
);

const DietMealModel = mongoose.model<IDietMealDocument>(
  'DietMeal',
  DietMealSchema
);

export default DietMealModel;
