import { Request, Response } from 'express';
//dietDays
import {
  CreateDietDayMealInput,
  UpdateDietDayMealInput,
  DeleteDietDayMealInput,
  GetDietDayMealInput,
  GetDietDayMealsInput,
} from '../../schema/diet/dietMeal.schema';

import {
  createDietMeal,
  deleteDietMeal,
  getAndUpdateDietMeal,
  getDietMeal,
  getDietMeals,
} from '../../services/diet/dietMeal.service';

export async function createDietMealController(
  req: Request<{}, {}, CreateDietDayMealInput['body']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const body = req.body;

  const dietMeal = await createDietMeal({
    ...body,
    user: userId,
  });

  if (!dietMeal) {
    return res.sendStatus(404);
  }

  return res.send(dietMeal);
}

export async function updateDietMealController(
  req: Request<UpdateDietDayMealInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dietMealId = req.params.dietMealId;
  const update = req.body;

  const dietMeal = await getDietMeal({
    _id: dietMealId,
  });

  if (!dietMeal) {
    return res.sendStatus(404);
  }

  if (String(dietMeal.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedDietMeal = await getAndUpdateDietMeal(
    { _id: dietMealId },
    update,
    {
      new: true,
    }
  );

  return res.send(updatedDietMeal);
}

export async function getDietMealController(
  req: Request<GetDietDayMealInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dietMealId = req.params.dietMealId;
  const dietMeal = await getDietMeal({
    _id: dietMealId,
  });

  if (!dietMeal) {
    return res.sendStatus(404);
  }

  if (String(dietMeal.user) !== userId) {
    return res.sendStatus(403);
  }

  return res.send(dietMeal);
}

export async function getDietMealsController(
  req: Request<GetDietDayMealsInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dayId = req.params.dietDayId;

  const dietMeals = await getDietMeals({ user: userId, dayId: dayId });

  if (!dietMeals) {
    return res.sendStatus(404);
  }

  const sortedMeals = [...dietMeals].sort((a, b) => a.order - b.order);

  return res.send(sortedMeals);
}

export async function deleteDietMealController(
  req: Request<DeleteDietDayMealInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dietMealId = req.params.dietMealId;

  const dietMeal = await getDietMeal({
    _id: dietMealId,
  });

  if (!dietMeal) {
    return res.sendStatus(404);
  }

  if (String(dietMeal.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteDietMeal({ _id: dietMealId });

  return res.sendStatus(200);
}
