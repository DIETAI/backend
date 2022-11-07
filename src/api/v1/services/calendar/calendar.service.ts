import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import CalendarModel from '../../models/calendar/calendar.model';
import {
  ICalendarInput,
  ICalendarDocument,
} from '../../interfaces/calendar/calendar.interfaces';

import { databaseResponseTimeHistogram } from '../../utils/metrics';

export async function createCalendarNote(input: ICalendarInput) {
  const metricsLabels = {
    operation: 'createCalendar',
  };
  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const result = await CalendarModel.create(input);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function getCalendarNote(
  query: FilterQuery<ICalendarDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getCalendar',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await CalendarModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getCalendarNotes(
  query: FilterQuery<ICalendarDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getCalendarNotes',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await CalendarModel.find(query, {}, options);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getAndUpdateCalendarNote(
  query: FilterQuery<ICalendarDocument>,
  update: UpdateQuery<ICalendarDocument>,
  options: QueryOptions
) {
  return CalendarModel.findOneAndUpdate(query, update, options);
}

export async function deleteCalendarNote(
  query: FilterQuery<ICalendarDocument>
) {
  return CalendarModel.deleteOne(query);
}
