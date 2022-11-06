import mongoose from 'mongoose';
import { IUserDocument } from '../user.interfaces';
import { IDietEstablishmentDocument } from '../dietEstablishments.interfaces';
import { IClientDocument } from '../client.interfaces';

export interface IDietInput {
  //basicInfo
  user: IUserDocument['_id'];
  name: string;
  folder?: string;
  daysAmount?: number;
  dayStart?: Date;
  dayEnd?: Date;
  clientId: IClientDocument['_id'];
  establishmentId: IDietEstablishmentDocument['_id'];
}

export interface IDietDocument extends IDietInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
