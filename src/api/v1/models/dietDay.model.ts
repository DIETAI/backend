import mongoose from 'mongoose';
import { IDietDayDocument } from '../interfaces/diet/dietDay.interfaces';

const Schema = mongoose.Schema;

const DietDaySchema = new Schema<IDietDayDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    establishmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DietEstablishment',
    },
    dietId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Diet',
    },
    name: { type: String, required: true },
    order: { type: Number, required: true },
    date: { type: Date },
    total: {
      kcal: { type: Number },
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

  {
    timestamps: true,
  }
);

const DietDayModel = mongoose.model<IDietDayDocument>('DietDay', DietDaySchema);

export default DietDayModel;
