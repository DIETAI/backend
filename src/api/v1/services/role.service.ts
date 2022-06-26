import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import RoleModel from '../models/role.model';
import { IRoleInput, IRoleDocument } from '../interfaces/roles.interfaces';

import { databaseResponseTimeHistogram } from '../utils/metrics';

export async function createRole(input: IRoleInput) {
  const metricsLabels = {
    operation: 'createRole',
  };
  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const result = await RoleModel.create(input);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function getRole(
  query: FilterQuery<IRoleDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getRole',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await RoleModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getRoles(options: QueryOptions = { lean: true }) {
  const metricsLabels = {
    operation: 'getRoles',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await RoleModel.find({}, {}, options);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getAndUpdateRole(
  query: FilterQuery<IRoleDocument>,
  update: UpdateQuery<IRoleDocument>,
  options: QueryOptions
) {
  const metricsLabels = {
    operation: 'updateRole',
  };

  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const result = await RoleModel.findOneAndUpdate(query, update, options);

    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function deleteRole(query: FilterQuery<IRoleDocument>) {
  const metricsLabels = {
    operation: 'deleteRole',
  };

  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const result = await RoleModel.deleteOne(query);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}
