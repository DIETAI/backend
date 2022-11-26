import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import InvoiceModel from '../../models/account/invoice.model';
import {
  IInvoiceInput,
  IInvoiceDocument,
} from '../../interfaces/account/invoice.interfaces';

import { databaseResponseTimeHistogram } from '../../utils/metrics';

export async function createInvoice(input: IInvoiceInput) {
  const metricsLabels = {
    operation: 'createInvoice',
  };
  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const result = await InvoiceModel.create(input);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function getInvoice(
  query: FilterQuery<IInvoiceDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getInvoice',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await InvoiceModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getInvoices(
  query: FilterQuery<IInvoiceDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getInvoices',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await InvoiceModel.find(query, {}, options);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getAndUpdateInvoice(
  query: FilterQuery<IInvoiceDocument>,
  update: UpdateQuery<IInvoiceDocument>,
  options: QueryOptions
) {
  return InvoiceModel.findOneAndUpdate(query, update, options);
}

export async function deleteInvoice(query: FilterQuery<IInvoiceDocument>) {
  return InvoiceModel.deleteOne(query);
}
