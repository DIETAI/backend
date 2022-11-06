import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import DinnerPortionModel from '../../models/dinners/dinnerPortion.model';
import {
  IDinnerPortionInput,
  IDinnerPortionDocument,
} from '../../interfaces/dinners/dinnerPortions.interfaces';

import { databaseResponseTimeHistogram } from '../../utils/metrics';

export async function createDinnerPortion(input: IDinnerPortionInput) {
  const metricsLabels = {
    operation: 'createDinnerPortion',
  };
  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const result = await DinnerPortionModel.create(input);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function getDinnerPortion(
  query: FilterQuery<IDinnerPortionDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getDinnerPortion',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await DinnerPortionModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    // throw e;
    return false;
  }
}

export async function getDinnerPortions(
  query: FilterQuery<IDinnerPortionDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getDinnerPortions',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await DinnerPortionModel.find(query, {}, options);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getAndUpdateDinnerPortion(
  query: FilterQuery<IDinnerPortionDocument>,
  update: UpdateQuery<IDinnerPortionDocument>,
  options: QueryOptions
) {
  return DinnerPortionModel.findOneAndUpdate(query, update, options);
}

export async function deleteDinnerPortion(
  query: FilterQuery<IDinnerPortionDocument>
) {
  return DinnerPortionModel.deleteOne(query);
}
