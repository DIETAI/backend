import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import DinnerProductModel from '../../models/dinners/dinnerProduct.model';
import {
  IDinnerProductInput,
  IDinnerProductDocument,
} from '../../interfaces/dinners/dinnerProducts.interfaces';

import { databaseResponseTimeHistogram } from '../../utils/metrics';

export async function createDinnerProduct(input: IDinnerProductInput) {
  const metricsLabels = {
    operation: 'createDinnerProduct',
  };
  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const result = await DinnerProductModel.create(input);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function getDinnerProduct(
  query: FilterQuery<IDinnerProductDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getDinnerProduct',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await DinnerProductModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getDinnerProducts(
  query: FilterQuery<IDinnerProductDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getDinnerProducts',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await DinnerProductModel.find(query, {}, options);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getAndUpdateDinnerProduct(
  query: FilterQuery<IDinnerProductDocument>,
  update: UpdateQuery<IDinnerProductDocument>,
  options: QueryOptions
) {
  return DinnerProductModel.findOneAndUpdate(query, update, options);
}

export async function deleteDinnerProduct(
  query: FilterQuery<IDinnerProductDocument>
) {
  return DinnerProductModel.deleteOne(query);
}
