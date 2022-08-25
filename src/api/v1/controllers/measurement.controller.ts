import { Request, Response } from 'express';
import {
  CreateMeasurementInput,
  UpdateMeasurementInput,
  DeleteMeasurementInput,
  GetMeasurementInput,
  GetMeasurementsInput,
} from '../schema/measurement.schema';
import {
  createMeasurement,
  deleteMeasurement,
  getAndUpdateMeasurement,
  getMeasurement,
  getMeasurements,
} from '../services/measurement.service';
import MeasurementModel from '../models/measurement.model';
import { getClient } from '../services/client.service';

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

export async function getMeasurementsController(
  req: Request<{}, {}, {}, GetMeasurementsInput['query']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const queryPage = req.query.page;
  const itemsCount = req.query.itemsCount;

  if (queryPage && itemsCount) {
    const page = parseInt(queryPage);
    const skip = (page - 1) * parseInt(itemsCount); // 1 * 20 = 20
    console.log({ skip });

    const countPromise = MeasurementModel.estimatedDocumentCount();
    const measurementsPromise = MeasurementModel.find({ user: userId })
      .limit(parseInt(itemsCount))
      .skip(skip);

    const [count, measurements] = await Promise.all([
      countPromise,
      measurementsPromise,
    ]);

    const pageCount = count / parseInt(itemsCount); // 400 items / 20 = 20

    if (!count || !measurements) {
      return res.sendStatus(404);
    }

    const measurementsQuery = await Promise.all(
      measurements.map(async (measurement) => {
        const client = await getClient({ _id: measurement.client });

        return {
          ...measurement.toObject(),
          measurementClient: {
            name: client?.name,
            lastName: client?.lastName,
            fullName: client?.name + ' ' + client?.lastName,
          },
        };
      })
    );

    return res.send({
      pagination: {
        count,
        pageCount,
      },
      measurements: measurementsQuery,
    });
  }

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
