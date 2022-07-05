import mongoose from 'mongoose';
import { IUserDocument } from './user.interfaces';

export interface ICalendarEventInput {
  user: IUserDocument['_id'];
  day: Date;
  timeStart: Date;
  timeEnd: Date;
  title: string;
  description?: string;
}

export interface ICalendarEventDocument
  extends ICalendarEventInput,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
