import mongoose from 'mongoose';
import { IDietDocument } from '../interfaces/diet/diet.interfaces';

const Schema = mongoose.Schema;

const DietSchema = new Schema<IDietDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    daysAmount: { type: Number },
    dayStart: { type: Date },
    dayEnd: { type: Date },
    folder: { type: String },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
    },
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
