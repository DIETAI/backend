import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import AssetModel from '../models/asset.model';
import { IAssetInput, IAssetDocument } from '../interfaces/assets.interfaces';

import { databaseResponseTimeHistogram } from '../utils/metrics';

export async function createAsset(input: IAssetInput) {
  const metricsLabels = {
    operation: 'createAsset',
  };
  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const result = await AssetModel.create(input);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function getAsset(
  query: FilterQuery<IAssetDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getAsset',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await AssetModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    // throw e;
    return null;
  }
}

export async function getAssets(
  query: FilterQuery<IAssetDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getAssets',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await AssetModel.find(query, {}, options);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getAndUpdateAsset(
  query: FilterQuery<IAssetDocument>,
  update: UpdateQuery<IAssetDocument>,
  options: QueryOptions
) {
  return AssetModel.findOneAndUpdate(query, update, options);
}

export async function deleteAsset(query: FilterQuery<IAssetDocument>) {
  return AssetModel.deleteOne(query);
}
