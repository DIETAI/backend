import mongoose from 'mongoose';
import { IInvoiceDocument } from '../../interfaces/account/invoice.interfaces';

const Schema = mongoose.Schema;

const InvoiceSchema = new Schema<IInvoiceDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    companyName: { type: String, required: true },
    taxpayerIdentificationNumber: { type: String, required: true },
    zipCode: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    houseNumber: { type: String, required: true },
    apartmentNumber: { type: String },
  },
  {
    timestamps: true,
  }
);

const InvoiceModel = mongoose.model<IInvoiceDocument>('Invoice', InvoiceSchema);

export default InvoiceModel;
