import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import AssetModel from '../models/asset.model';
import { IAssetInput, IAssetDocument } from '../interfaces/assets.interfaces';

import { databaseResponseTimeHistogram } from '../utils/metrics';

export async function getPaginationItems(input: IAssetInput) {
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
