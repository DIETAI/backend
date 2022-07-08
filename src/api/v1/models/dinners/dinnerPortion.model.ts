import mongoose from 'mongoose';
import { IDinnerPortionDocument } from '../../interfaces/dinners/dinnerPortions.interfaces';

const Schema = mongoose.Schema;

const DinnerPortionSchema = new Schema<IDinnerPortionDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dinnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dinner' },
    dinnerProducts: {
      required: true,
      type: [
        {
          dinnerProductId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'DinnerProduct',
          },
          portion: { type: Number, required: true },
          total: {
            kcal: { type: Number },
          },
        },
      ],
    },
    total: {
      kcal: { type: Number },
    },
    type: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const DinnerPortionModel = mongoose.model<IDinnerPortionDocument>(
  'DinnerPortion',
  DinnerPortionSchema
);

export default DinnerPortionModel;
