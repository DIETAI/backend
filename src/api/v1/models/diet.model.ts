import mongoose from 'mongoose';
import { IDietDocument } from '../interfaces/diet/diet.interfaces';

const Schema = mongoose.Schema;

const DietSchema = new Schema<IDietDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    daysAmount: { type: Number, required: true },
    dayStart: { type: Date },
    dayEnd: { type: Date },
    folder: { type: String },
    establishmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DietEstablishment',
    },
  },
  {
    timestamps: true,
  }
);

const DietModel = mongoose.model<IDietDocument>('Diet', DietSchema);

export default DietModel;
