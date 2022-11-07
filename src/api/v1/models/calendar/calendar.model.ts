import mongoose from 'mongoose';
import { ICalendarDocument } from '../../interfaces/calendar/calendar.interfaces';

const Schema = mongoose.Schema;

const CalendarSchema = new Schema<ICalendarDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date },
  },
  {
    timestamps: true,
  }
);

const CalendarModel = mongoose.model<ICalendarDocument>(
  'Calendar',
  CalendarSchema
);

export default CalendarModel;
