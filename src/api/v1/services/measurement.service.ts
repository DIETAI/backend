import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import MeasurementModel from '../models/measurement.model';
import {
  IMeasurementInput,
  IMeasurementDocument,
} from '../interfaces/measurement.interfaces';

import { databaseResponseTimeHistogram } from '../utils/metrics';

export async function createMeasurement(input: IMeasurementInput) {
  const metricsLabels = {
    operation: 'createMeasurement',
  };
  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const result = await MeasurementModel.create(input);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function getMeasurement(
  query: FilterQuery<IMeasurementDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getMeasurement',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await MeasurementModel.findOne(query, {}, options)
      .populate({
        path: 'client',
        select: ['_id', 'name', 'lastName'],
      })
      .populate({
        path: 'images',
        select: ['_id', 'imageURL'],
      });
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getMeasurements(
  query: FilterQuery<IMeasurementDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getMeasurements',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await MeasurementModel.find(query, {}, options)
      .populate({
        path: 'client',
        select: ['_id', 'name', 'lastName'],
      })
      .populate({
        path: 'images',
        select: ['_id', 'imageURL'],
      });
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getAndUpdateMeasurement(
  query: FilterQuery<IMeasurementDocument>,
  update: UpdateQuery<IMeasurementDocument>,
  options: QueryOptions
) {
  return MeasurementModel.findOneAndUpdate(query, update, options);
}

export async function deleteMeasurement(
  query: FilterQuery<IMeasurementDocument>
) {
  return MeasurementModel.deleteOne(query);
}
