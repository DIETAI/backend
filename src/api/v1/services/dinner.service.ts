import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import DinnerModel from '../models/dinner.model';
import {
  IDinnerInput,
  IDinnerDocument,
} from '../interfaces/dinners.interfaces';

import { databaseResponseTimeHistogram } from '../utils/metrics';

export async function createDinner(input: IDinnerInput) {
  const metricsLabels = {
    operation: 'createDinner',
  };
  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const result = await DinnerModel.create(input);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function getDinner(
  query: FilterQuery<IDinnerDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getDinner',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await DinnerModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getDinners(
  query: FilterQuery<IDinnerDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getDinners',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await DinnerModel.find(query, {}, options);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getAndUpdateDinner(
  query: FilterQuery<IDinnerDocument>,
  update: UpdateQuery<IDinnerDocument>,
  options: QueryOptions
) {
  return DinnerModel.findOneAndUpdate(query, update, options);
}

export async function deleteDinner(query: FilterQuery<IDinnerDocument>) {
  return DinnerModel.deleteOne(query);
}
