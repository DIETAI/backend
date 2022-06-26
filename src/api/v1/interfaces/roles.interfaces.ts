import mongoose from 'mongoose';

// export enum Roles {
//   personal = 'personal',
//   patient = 'patient',
//   dietician = 'dietician',
//   admin = 'admin',
// }

export interface IRoleInput {
  type: 'personal' | 'patient' | 'dietician' | 'admin';
}

export interface IRoleDocument extends IRoleInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}