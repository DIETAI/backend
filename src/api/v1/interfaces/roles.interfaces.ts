import mongoose from 'mongoose';

export interface IRoleInput {
  type: 'personal' | 'patient' | 'dietician' | 'admin';
}

export interface IRoleDocument extends IRoleInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
