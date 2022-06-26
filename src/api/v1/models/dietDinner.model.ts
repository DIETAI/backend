import mongoose from 'mongoose';
import { IDietDinnerDocument } from '../interfaces/diet/dietDinner.interfaces';

const Schema = mongoose.Schema;

const DietDinnerSchema = new Schema<IDietDinnerDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dietId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Diet',
      required: true,
    },
    dayId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DietDay',
      required: true,
    },
    dietMealId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DietMeal',
      required: true,
    },
    dinnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dinner',
      required: true,
    },
    products: [
      {
        productId: { type: String, required: true },
        selectedPortionGram: { type: Number, required: true },
        total: {
          kcal: { type: Number },
        },
      },
    ],
    // name: { type: String, required: true },
    order: { type: Number, required: true },
    total: {
      kcal: { type: Number },
      // protein: {
      //   gram: { type: Number },
      //   kcal: { type: Number },
      //   procent: { type: Number },
      // },
      // fat: {
      //   gram: { type: Number },
      //   kcal: { type: Number },
      //   procent: { type: Number },
      // },
      // carbohydrates: {
      //   gram: { type: Number },
      //   kcal: { type: Number },
      //   procent: { type: Number },
      // },
      // fiber: {
      //   gram: { type: Number },
      //   kcal: { type: Number },
      // },
    },
  },

  {
    timestamps: true,
  }
);

const DietDinnerModel = mongoose.model<IDietDinnerDocument>(
  'DietDinner',
  DietDinnerSchema
);

export default DietDinnerModel;
