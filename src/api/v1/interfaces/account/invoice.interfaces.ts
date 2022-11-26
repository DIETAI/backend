import mongoose from 'mongoose';
import { IUserDocument } from '../user.interfaces';

export interface IInvoiceInput {
  user: IUserDocument['_id'];
  companyName: string;
  taxpayerIdentificationNumber: string; //nip
  zipCode: string;
  city: string;
  street: string;
  houseNumber: string;
  apartmentNumber?: string;
}

export interface IInvoiceDocument extends IInvoiceInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
