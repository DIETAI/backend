import mongoose from 'mongoose';
import { IDietKindDocument } from '../../interfaces/dietKind/dietKind.interfaces';

const Schema = mongoose.Schema;

const DietKindSchema = new Schema<IDietKindDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

const DietKindModel = mongoose.model<IDietKindDocument>(
  'DietKind',
  DietKindSchema
);

export default DietKindModel;
