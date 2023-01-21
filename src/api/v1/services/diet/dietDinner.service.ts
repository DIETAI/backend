import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import DietDinnerModel from '../../models/dietDinner.model';
import {
  IDietDinnerInput,
  IDietDinnerDocument,
} from '../../interfaces/diet/dietDinner.interfaces';

import { databaseResponseTimeHistogram } from '../../utils/metrics';

export async function createDietDinner(input: IDietDinnerInput) {
  const metricsLabels = {
    operation: 'createDietDinner',
  };

  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const result = await DietDinnerModel.create(input);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function getDietDinner(
  query: FilterQuery<IDietDinnerDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getDietDinner',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await DietDinnerModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getDietDinners(
  query: FilterQuery<IDietDinnerDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getDietDinners',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await DietDinnerModel.find(query, {}, options);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getDietDinnersWithTotal(
  query: FilterQuery<IDietDinnerDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getDietDinners',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await DietDinnerModel.find(query, {}, options).populate({
      path: 'dinnerPortionId',
      select: 'total',
    });
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getAndUpdateDietDinner(
  query: FilterQuery<IDietDinnerDocument>,
  update: UpdateQuery<IDietDinnerDocument>,
  options: QueryOptions
) {
  return DietDinnerModel.findOneAndUpdate(query, update, options);
}

export async function deleteDietDinner(
  query: FilterQuery<IDietDinnerDocument>
) {
  return DietDinnerModel.deleteOne(query);
}
