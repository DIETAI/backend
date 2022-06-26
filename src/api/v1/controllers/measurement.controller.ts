import { Request, Response } from 'express';
import {
  CreateMeasurementInput,
  UpdateMeasurementInput,
  DeleteMeasurementInput,
  GetMeasurementInput,
} from '../schema/measurement.schema';
import {
  createMeasurement,
  deleteMeasurement,
  getAndUpdateMeasurement,
  getMeasurement,
  getMeasurements,
} from '../services/measurement.service';

export async function createMeasurementController(
  req: Request<{}, {}, CreateMeasurementInput['body']>,
  res: Response
) {
  const userId = res.locals.user._id;

  const body = req.body;

  const measurement = await createMeasurement({ ...body, user: userId });

  return res.send(measurement);
}

export async function updateMeasurementController(
  req: Request<UpdateMeasurementInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;

  const measurementId = req.params.measurementId;
  const update = req.body;

  const measurement = await getMeasurement({ _id: measurementId });

  if (!measurement) {
    return res.sendStatus(404);
  }

  if (String(measurement.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedMeasurement = await getAndUpdateMeasurement(
    { _id: measurementId },
    update,
    {
      new: true,
    }
  );

  return res.send(updatedMeasurement);
}

export async function getMeasurementController(
  req: Request<GetMeasurementInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const measurementId = req.params.measurementId;
  const measurement = await getMeasurement({ _id: measurementId });

  if (!measurement) {
    return res.sendStatus(404);
  }

  if (String(measurement.user) !== userId) {
    return res.sendStatus(403);
  }

  return res.send(measurement);
}

export async function getMeasurementsController(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const measurements = await getMeasurements({ user: userId });

  if (!measurements) {
    return res.sendStatus(404);
  }

  return res.send(measurements);
}

export async function deleteMeasurementController(
  req: Request<DeleteMeasurementInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const measurementId = req.params.measurementId;

  const measurement = await getMeasurement({ _id: measurementId });

  if (!measurement) {
    return res.sendStatus(404);
  }

  if (String(measurement.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteMeasurement({ _id: measurementId });

  return res.sendStatus(200);
}
