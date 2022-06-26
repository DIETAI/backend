import mongoose from 'mongoose';

import { ISessionDocument } from '../interfaces/session.interfaces';

const Schema = mongoose.Schema;

const SessionSchema = new Schema<ISessionDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  {
    timestamps: true,
  }
);

const SessionModel = mongoose.model<ISessionDocument>('Session', SessionSchema);

export default SessionModel;
