import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import DietMealModel from '../../models/dietMeal.model';
import {
  IDietMealInput,
  IDietMealDocument,
} from '../../interfaces/diet/dietMeal.interfaces';

import { databaseResponseTimeHistogram } from '../../utils/metrics';

export async function createDietMeal(input: IDietMealInput) {
  const metricsLabels = {
    operation: 'createDietMeal',
  };

  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const result = await DietMealModel.create(input);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function getDietMeal(
  query: FilterQuery<IDietMealDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getDietMeal',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await DietMealModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getDietMeals(
  query: FilterQuery<IDietMealDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getDietMeals',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await DietMealModel.find(query, {}, options);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getAndUpdateDietMeal(
  query: FilterQuery<IDietMealDocument>,
  update: UpdateQuery<IDietMealDocument>,
  options: QueryOptions
) {
  return DietMealModel.findOneAndUpdate(query, update, options);
}

export async function deleteDietMeal(query: FilterQuery<IDietMealDocument>) {
  return DietMealModel.deleteOne(query);
}
