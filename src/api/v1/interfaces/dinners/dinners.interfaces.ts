import mongoose from 'mongoose';
import { IUserDocument } from '../user.interfaces';

type IPreparationTime =
  | '5m-less'
  | '10m-less'
  | '15m-less'
  | '20m-less'
  | '30m-less'
  | '40m-less'
  | '50m-less'
  | '1h-less'
  | '1.5h-less'
  | '2h-less'
  | '2.5h-less'
  | '3h-less'
  | '4h-less'
  | '5h-less'
  | '6h-less'
  | '7h-less'
  | '8h-less'
  | '9h-less'
  | '10h-less'
  | '10h-more';

export interface IDinnerInput {
  user: IUserDocument['_id'];
  name: string;
  image?: string;
  gallery?: string[];
  mealTypes: (
    | 'breakfast'
    | 'dinner'
    | 'second_breakfast'
    | 'lunch'
    | 'snack'
  )[];
  mealTypesKind: 'soup' | 'mainCourse' | 'drink';
  description?: string;
  recipe?: string;
  dietKindsExclude?: string[];
  tags?: ('nogluten' | 'lactose-free')[];
  preparation_time: IPreparationTime;
}

export interface IDinnerDocument extends IDinnerInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
