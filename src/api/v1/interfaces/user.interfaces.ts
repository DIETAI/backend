import mongoose from 'mongoose';
import { IAssetDocument } from './assets.interfaces';
import { IRoleDocument } from './roles.interfaces';

export interface ICreateUserInput {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IUserInput extends ICreateUserInput {
  role?: IRoleDocument['_id'];
  emailVerified?: boolean;
  phoneNumber?: string;
  photoURL?: string;
  avatar?: IAssetDocument['_id'];
}
//user data
export interface IUserDocument extends IUserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  getFullName(): string;
}
