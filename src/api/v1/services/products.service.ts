import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import ProductModel from '../models/product.model';
import {
  IProductInput,
  IProductDocument,
} from '../interfaces/products.interfaces';

import { databaseResponseTimeHistogram } from '../utils/metrics';

export async function createProduct(input: IProductInput) {
  const metricsLabels = {
    operation: 'createProduct',
  };
  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const result = await ProductModel.create(input);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function getProduct(
  query: FilterQuery<IProductDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getProduct',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await ProductModel.findOne(query, {}, options).populate({
      path: 'image',
    });
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });
    return null;
    // throw e;
  }
}

export async function getUserProducts(
  query: FilterQuery<IProductDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getUserProducts',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await ProductModel.find(query, {}, options).populate({
      path: 'image',
    });
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getAndUpdateProduct(
  query: FilterQuery<IProductDocument>,
  update: UpdateQuery<IProductDocument>,
  options: QueryOptions
) {
  const metricsLabels = {
    operation: 'updateProduct',
  };

  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const result = await ProductModel.findOneAndUpdate(query, update, options);

    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function deleteProduct(query: FilterQuery<IProductDocument>) {
  const metricsLabels = {
    operation: 'deleteProduct',
  };

  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const result = await ProductModel.deleteOne(query);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}
