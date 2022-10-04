import mongoose from 'mongoose';
import { IUserDocument } from '../user.interfaces';

export interface IDietKindInput {
  user: IUserDocument['_id'];
  name: string;
  type: 'healing' | 'unconventional' | 'other'; //"niekownencjonalna" | "lecznicza" | "inna"
  description?: string;
}

export interface IDietKindDocument extends IDietKindInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
