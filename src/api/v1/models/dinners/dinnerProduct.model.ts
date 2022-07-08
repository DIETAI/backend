import mongoose from 'mongoose';
import { IDinnerProductDocument } from '../../interfaces/dinners/dinnerProducts.interfaces';

const Schema = mongoose.Schema;

const DinnerProductSchema = new Schema<IDinnerProductDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dinnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dinner' },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    defaultAmount: { type: Number, required: true },
    minAmount: { type: Number },
    maxAmount: { type: Number },
    portionsGram: { required: true, type: [{ type: Number, required: true }] },
  },
  {
    timestamps: true,
  }
);

const DinnerProductModel = mongoose.model<IDinnerProductDocument>(
  'DinnerProduct',
  DinnerProductSchema
);

export default DinnerProductModel;
