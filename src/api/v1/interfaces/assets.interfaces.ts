import mongoose from 'mongoose';
import { IUserDocument } from './user.interfaces';

export interface IAssetInput {
  user: IUserDocument['_id'];
  title: string;
  description?: string;
  imageURL: string;
}

export interface IAssetDocument extends IAssetInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
