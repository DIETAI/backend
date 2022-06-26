import mongoose from 'mongoose';
import { IRoleDocument } from './roles.interfaces';

export interface ICreateUserInput {
  name: string;
  lastName: string;
  fullName: string;
  email: string;
  password: string;
  photoURL?: string;
}

export interface IUserInput extends ICreateUserInput {
  role?: IRoleDocument['_id'];
  emailVerified?: boolean;
  phoneNumber?: string;
  photoURL?: string;
}

export interface IUserDocument extends IUserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
