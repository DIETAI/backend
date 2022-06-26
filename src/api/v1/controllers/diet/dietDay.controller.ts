import { Request, Response } from 'express';
//dietDays
import {
  CreateDietDayInput,
  UpdateDietDayInput,
  DeleteDietDayInput,
  GetDietDayInput,
  GetDietDaysInput,
} from '../../schema/diet/dietDay.schema';

import {
  createDietDay,
  deleteDietDay,
  getAndUpdateDietDay,
  getDietDay,
  getDietDays,
} from '../../services/diet/dietDay.service';

export async function createDietDayController(
  req: Request<{}, {}, CreateDietDayInput['body']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const body = req.body;

  const dietDay = await createDietDay({
    ...body,
    user: userId,
  });

  if (!dietDay) {
    return res.sendStatus(404);
  }

  return res.send(dietDay);
}

export async function updateDietDayController(
  req: Request<UpdateDietDayInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dietDayId = req.params.dietDayId;
  const update = req.body;

  const dietDay = await getDietDay({
    _id: dietDayId,
  });

  if (!dietDay) {
    return res.sendStatus(404);
  }

  if (String(dietDay.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedDietDay = await getAndUpdateDietDay({ _id: dietDayId }, update, {
    new: true,
  });

  return res.send(updatedDietDay);
}

export async function getDietDayController(
  req: Request<GetDietDayInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dietDayId = req.params.dietDayId;
  const dietDay = await getDietDay({
    _id: dietDayId,
  });

  if (!dietDay) {
    return res.sendStatus(404);
  }

  if (String(dietDay.user) !== userId) {
    return res.sendStatus(403);
  }

  return res.send(dietDay);
}

export async function getDietDaysController(
  req: Request<GetDietDaysInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dietId = req.params.dietId;

  const dietDays = await getDietDays({ user: userId, dietId: dietId });

  if (!dietDays) {
    return res.sendStatus(404);
  }

  const sortedDays = [...dietDays].sort((a, b) => a.order - b.order);

  return res.send(sortedDays);
}

export async function deleteDietDayController(
  req: Request<DeleteDietDayInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dietDayId = req.params.dietDayId;

  const dietDay = await getDietDay({
    _id: dietDayId,
  });

  if (!dietDay) {
    return res.sendStatus(404);
  }

  if (String(dietDay.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteDietDay({ _id: dietDayId });

  return res.sendStatus(200);
}
