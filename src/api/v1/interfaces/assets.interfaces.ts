import mongoose from 'mongoose';
import { IUserDocument } from './user.interfaces';

export interface IUploadImageInput {
  name: string;
  type: string;
  size: number;
}

export interface IAssetInput {
  user: IUserDocument['_id'];
  title: string;
  description?: string;
  imageURL: string;
  size: number;
  key: string;
}

export interface IAssetDocument extends IAssetInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
