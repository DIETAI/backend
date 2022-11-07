import mongoose from 'mongoose';
import { IUserDocument } from '../user.interfaces';

export interface ICalendarInput {
  user: IUserDocument['_id'];
  title: string;
  description?: string;
  date: Date;
}

export interface ICalendarDocument extends ICalendarInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
