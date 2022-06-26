import { Request, Response } from 'express';
//dietDays
import {
  CreateDietDinnerInput,
  UpdateDietDinnerInput,
  DeleteDietDinnerInput,
  GetDietDinnerInput,
  GetDietDinnersInput,
} from '../../schema/diet/dietDinner.schema';

import {
  createDietDinner,
  deleteDietDinner,
  getAndUpdateDietDinner,
  getDietDinner,
  getDietDinners,
} from '../../services/diet/dietDinner.service';

export async function createDietDinnerController(
  req: Request<{}, {}, CreateDietDinnerInput['body']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const body = req.body;

  const dietDinner = await createDietDinner({
    ...body,
    user: userId,
  });

  if (!dietDinner) {
    return res.sendStatus(404);
  }

  return res.send(dietDinner);
}

export async function updateDietDinnerController(
  req: Request<UpdateDietDinnerInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dietDinnerId = req.params.dietDinnerId;
  const update = req.body;

  const dietDinner = await getDietDinner({
    _id: dietDinnerId,
  });

  if (!dietDinner) {
    return res.sendStatus(404);
  }

  if (String(dietDinner.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedDietDinner = await getAndUpdateDietDinner(
    { _id: dietDinnerId },
    update,
    {
      new: true,
    }
  );

  return res.send(updatedDietDinner);
}

export async function getDietDinnerController(
  req: Request<GetDietDinnerInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dietDinnerId = req.params.dietDinnerId;
  const dietDinner = await getDietDinner({
    _id: dietDinnerId,
  });

  if (!dietDinner) {
    return res.sendStatus(404);
  }

  if (String(dietDinner.user) !== userId) {
    return res.sendStatus(403);
  }

  return res.send(dietDinner);
}

export async function getDietDinnersController(
  req: Request<GetDietDinnersInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const mealId = req.params.dietMealId;

  const dietDinners = await getDietDinners({
    user: userId,
    dietMealId: mealId,
  });

  if (!dietDinners) {
    return res.sendStatus(404);
  }

  const sortedDinners = [...dietDinners].sort((a, b) => a.order - b.order);

  return res.send(sortedDinners);
}

export async function deleteDietDinnerController(
  req: Request<DeleteDietDinnerInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dietDinnerId = req.params.dietDinnerId;

  const dietDinner = await getDietDinner({
    _id: dietDinnerId,
  });

  if (!dietDinner) {
    return res.sendStatus(404);
  }

  if (String(dietDinner.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteDietDinner({ _id: dietDinnerId });

  return res.sendStatus(200);
}
