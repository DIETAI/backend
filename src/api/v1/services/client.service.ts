import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import ClientModel from '../models/client.model';
import { IClientInput, IClientDocument } from '../interfaces/client.interfaces';

import { databaseResponseTimeHistogram } from '../utils/metrics';

export async function createClient(input: IClientInput) {
  const metricsLabels = {
    operation: 'createClient',
  };
  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const result = await ClientModel.create(input);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function getClient(
  query: FilterQuery<IClientDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getClient',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await ClientModel.findOne(query, {}, options).populate({
      path: 'image',
    }); //przy podaniu 2 i 3 argumentu błąd => nie można odczytać fullName (przy lean = true)

    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getClients(
  query: FilterQuery<IClientDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getClients',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await ClientModel.find(query, {}, options).populate({
      path: 'image',
    });
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getAndUpdateClient(
  query: FilterQuery<IClientDocument>,
  update: UpdateQuery<IClientDocument>,
  options: QueryOptions
) {
  return ClientModel.findOneAndUpdate(query, update, options);
}

export async function deleteClient(query: FilterQuery<IClientDocument>) {
  return ClientModel.deleteOne(query);
}
