import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import DietDayModel from '../../models/dietDay.model';
import {
  IDietDayInput,
  IDietDayDocument,
} from '../../interfaces/diet/dietDay.interfaces';

import { databaseResponseTimeHistogram } from '../../utils/metrics';

export async function createDietDay(input: IDietDayInput) {
  const metricsLabels = {
    operation: 'createDietDay',
  };

  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const result = await DietDayModel.create(input);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function getDietDay(
  query: FilterQuery<IDietDayDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getDietDay',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await DietDayModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getDietDays(
  query: FilterQuery<IDietDayDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getDietDays',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await DietDayModel.find(query, {}, options);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getAndUpdateDietDay(
  query: FilterQuery<IDietDayDocument>,
  update: UpdateQuery<IDietDayDocument>,
  options: QueryOptions
) {
  return DietDayModel.findOneAndUpdate(query, update, options);
}

export async function deleteDietDay(query: FilterQuery<IDietDayDocument>) {
  return DietDayModel.deleteOne(query);
}
