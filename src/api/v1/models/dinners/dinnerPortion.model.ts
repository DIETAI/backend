import mongoose from 'mongoose';
import { IDinnerPortionDocument } from '../../interfaces/dinners/dinnerPortions.interfaces';
import { totalSchemaValues } from '../total/total.schema';

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
            ...totalSchemaValues,
          },

          // total: {
          //   kcal: { type: Number },
          // },
        },
      ],
    },
    // total: {
    //   kcal: { type: Number },
    // },
    total: {
      ...totalSchemaValues,
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
