import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import DietModel from '../../models/diet.model';
import {
  IDietInput,
  IDietDocument,
} from '../../interfaces/diet/diet.interfaces';

import { databaseResponseTimeHistogram } from '../../utils/metrics';

export async function createDiet(input: IDietInput) {
  const metricsLabels = {
    operation: 'createDiet',
  };
  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const result = await DietModel.create(input);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function getDiet(
  query: FilterQuery<IDietDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getDiet',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await DietModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getDiets(
  query: FilterQuery<IDietDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getDiets',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await DietModel.find(query, {}, options);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getAndUpdateDiet(
  query: FilterQuery<IDietDocument>,
  update: UpdateQuery<IDietDocument>,
  options: QueryOptions
) {
  return DietModel.findOneAndUpdate(query, update, options);
}

export async function deleteDiet(query: FilterQuery<IDietDocument>) {
  return DietModel.deleteOne(query);
}
