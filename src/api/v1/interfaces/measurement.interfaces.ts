import mongoose from 'mongoose';
import { IUserDocument } from './user.interfaces';
import { IAssetDocument } from './assets.interfaces';
import { IClientDocument } from './client.interfaces';

export interface IMeasurementInput {
  user: IUserDocument['_id'];
  client: IClientDocument['_id'];
  name: string;
  date: Date;
  notes?: string;
  images?: IAssetDocument['_id'][];
  weight: number;
  height: number;
  bmi: number;
  ppmMifflin: number;
  ppmHarris: number;
  cpm: number;
  whr?: number;
  whtr?: number;
  ymca?: number;
  //circuits
  chest_breath?: number;
  chest_exhaust?: number;
  shoulder?: number;
  shoulder_tonus?: number;
  waist?: number;
  hip?: number;
  forearm?: number;
  thigh?: number;
  calf?: number;
  //lappets
  biceps?: number;
  triceps?: number;
  shoulder_blade?: number;
  ala_of_ilium?: number;
  iliac_spine?: number;
}

export interface IMeasurementDocument
  extends IMeasurementInput,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
