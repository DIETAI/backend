import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import SubscriptionPlanModel from '../../models/subscriptionPlan/subscriptionPlan.model';
import {
  ISubscriptionPlanInput,
  ISubscriptionPlanDocument,
} from '../../interfaces/subscriptionPlan/subscriptionPlan.interfaces';

import { databaseResponseTimeHistogram } from '../../utils/metrics';

export async function createSubscriptionPlan(input: ISubscriptionPlanInput) {
  const metricsLabels = {
    operation: 'createSubscriptionPlan',
  };
  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const result = await SubscriptionPlanModel.create(input);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function getSubscriptionPlan(
  query: FilterQuery<ISubscriptionPlanDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getSubscriptionPlan',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await SubscriptionPlanModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getSubscriptionPlans(
  query: FilterQuery<ISubscriptionPlanDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getSubscriptionPlans',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await SubscriptionPlanModel.find(query, {}, options);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getAndUpdateSubscriptionPlan(
  query: FilterQuery<ISubscriptionPlanDocument>,
  update: UpdateQuery<ISubscriptionPlanDocument>,
  options: QueryOptions
) {
  return SubscriptionPlanModel.findOneAndUpdate(query, update, options);
}

export async function deleteSubscriptionPlan(
  query: FilterQuery<ISubscriptionPlanDocument>
) {
  return SubscriptionPlanModel.deleteOne(query);
}
