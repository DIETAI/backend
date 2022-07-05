import mongoose from 'mongoose';
import { ITransactionDocument } from '../../interfaces/transaction/transaction.interfaces';

const Schema = mongoose.Schema;

const TransactionSchema = new Schema<ITransactionDocument>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubscriptionPlan',
      required: true,
    },
    subscriptionPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subscriptionPlanVariant: { type: String, required: true },
    valid: { type: Boolean, required: true, default: false },
    dateStart: { type: Date, required: true },
    dateEnd: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const TransactionModel = mongoose.model<ITransactionDocument>(
  'Transaction',
  TransactionSchema
);

export default TransactionModel;
