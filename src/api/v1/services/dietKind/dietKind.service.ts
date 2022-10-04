import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import DietKindModel from '../../models/dietKind/dietKind.model';
import {
  IDietKindInput,
  IDietKindDocument,
} from '../../interfaces/dietKind/dietKind.interfaces';

import { databaseResponseTimeHistogram } from '../../utils/metrics';

export async function createDietKind(input: IDietKindInput) {
  const metricsLabels = {
    operation: 'createDietKind',
  };
  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const result = await DietKindModel.create(input);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function getDietKind(
  query: FilterQuery<IDietKindDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getDietKind',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await DietKindModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getDietKinds(
  query: FilterQuery<IDietKindDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getDietKinds',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await DietKindModel.find(query, {}, options);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getAndUpdateDietKind(
  query: FilterQuery<IDietKindDocument>,
  update: UpdateQuery<IDietKindDocument>,
  options: QueryOptions
) {
  return DietKindModel.findOneAndUpdate(query, update, options);
}

export async function deleteDietKind(query: FilterQuery<IDietKindDocument>) {
  return DietKindModel.deleteOne(query);
}
