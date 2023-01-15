import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import DietEstablishmentModel from '../models/dietEstablishments.model';
import {
  IDietEstablishmentInput,
  IDietEstablishmentDocument,
} from '../interfaces/dietEstablishments.interfaces';

import { databaseResponseTimeHistogram } from '../utils/metrics';

export async function createDietEstablishment(input: IDietEstablishmentInput) {
  const metricsLabels = {
    operation: 'createDietEstablishment',
  };
  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const result = await DietEstablishmentModel.create(input);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function getDietEstablishment(
  query: FilterQuery<IDietEstablishmentDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getDietEstablishment',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await DietEstablishmentModel.findOne(query, {}, options)
      .populate({
        path: 'client',
        select: ['_id', 'name', 'lastName'],
      })
      .populate({
        path: 'dietKind',
        select: ['_id', 'name', 'type'],
      })
      .populate({
        path: 'measurementId',
        select: ['_id', 'name', 'cpm'],
      });
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getDietEstablishments(
  query: FilterQuery<IDietEstablishmentDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getDietEstablishments',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await DietEstablishmentModel.find(query, {}, options)
      .populate({
        path: 'client',
        select: ['_id', 'name', 'lastName'],
      })
      .populate({
        path: 'dietKind',
        select: ['_id', 'name', 'type'],
      })
      .populate({
        path: 'measurementId',
        select: ['_id', 'name', 'cpm'],
      });
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getAndUpdateDietEstablishment(
  query: FilterQuery<IDietEstablishmentDocument>,
  update: UpdateQuery<IDietEstablishmentDocument>,
  options: QueryOptions
) {
  return DietEstablishmentModel.findOneAndUpdate(query, update, options);
}

export async function deleteDietEstablishment(
  query: FilterQuery<IDietEstablishmentDocument>
) {
  return DietEstablishmentModel.deleteOne(query);
}
