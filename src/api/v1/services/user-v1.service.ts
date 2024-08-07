import { FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import UserModel from '../models/user.model';
import { omit } from 'lodash';
import {
  ICreateUserInput,
  IUserInput,
  IUserDocument,
} from '../interfaces/user.interfaces';
import { databaseResponseTimeHistogram } from '../utils/metrics';
import RoleModel from '../models/role.model';

export async function createUser(input: ICreateUserInput) {
  const metricsLabels = {
    operation: 'createUser',
  };
  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const result = await UserModel.create(input);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function getUser(query: FilterQuery<IUserDocument>) {
  const metricsLabels = {
    operation: 'getUser',
  };
  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const user = await UserModel.findOne(query).populate({
      path: 'avatar',
    });
    timer({ ...metricsLabels, success: 'true' });
    return user;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function getAndUpdateUser(
  query: FilterQuery<IUserDocument>,
  update: UpdateQuery<IUserDocument>,
  options: QueryOptions
) {
  const metricsLabels = {
    operation: 'updateUser',
  };

  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const result = await UserModel.findOneAndUpdate(query, update, options);

    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function validateEmail(email: string) {
  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    return true;
  }

  return false;
}
