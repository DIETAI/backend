import { Request, Response } from 'express';
import {
  CreateDinnerInput,
  UpdateDinnerInput,
  DeleteDinnerInput,
  GetDinnerInput,
} from '../../schema/dinners/dinner.schema';
import {
  createDinner,
  deleteDinner,
  getAndUpdateDinner,
  getDinner,
  getDinners,
} from '../../services/dinner/dinner.service';
import {
  deleteDinnerPortion,
  getDinnerPortions,
} from '../../services/dinner/dinnerPortion.service';
import {
  getDinnerProducts,
  deleteDinnerProduct,
} from '../../services/dinner/dinnerProduct.service';

//events
import { dinnerEmitter } from './events';

export async function createDinnerController(
  req: Request<{}, {}, CreateDinnerInput['body']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const body = req.body;

  const dinner = await createDinner({
    ...body,
    user: userId,
  });

  return res.send(dinner);
}

export async function updateDinnerController(
  req: Request<UpdateDinnerInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;

  const dinnerId = req.params.dinnerId;
  const update = req.body;

  const dinner = await getDinner({
    _id: dinnerId,
  });

  if (!dinner) {
    return res.sendStatus(404);
  }

  if (String(dinner.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedDinner = await getAndUpdateDinner({ _id: dinnerId }, update, {
    new: true,
  });

  return res.send(updatedDinner);
}

export async function getDinnerController(
  req: Request<GetDinnerInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dinnerId = req.params.dinnerId;
  const dinner = await getDinner({
    _id: dinnerId,
  });

  if (!dinner) {
    return res.sendStatus(404);
  }

  if (String(dinner.user) !== userId) {
    return res.sendStatus(403);
  }

  return res.send(dinner);
}

export async function getDinnersController(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const dinners = await getDinners({ user: userId });

  if (!dinners) {
    return res.sendStatus(404);
  }

  return res.send(dinners);
}

export async function deleteDinnerController(
  req: Request<DeleteDinnerInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dinnerId = req.params.dinnerId;

  const dinner = await getDinner({
    _id: dinnerId,
  });

  if (!dinner) {
    return res.sendStatus(404);
  }

  if (String(dinner.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteDinner({ _id: dinnerId });

  const dinnerProducts = await getDinnerProducts({ dinnerId: dinnerId });
  const dinnerPortions = await getDinnerPortions({ dinnerId: dinnerId });

  const deleteDinnerProducts = await Promise.all(
    dinnerProducts.map(async (dinnerProduct) => {
      await deleteDinnerProduct({ _id: dinnerProduct._id });
    })
  );

  const deleteDinnerPortions = await Promise.all(
    dinnerPortions.map(async (dinnerPortion) => {
      await deleteDinnerPortion({ _id: dinnerPortion._id });
      dinnerEmitter.emit('dinnerPortion:delete', dinnerPortion._id);
    })
  );

  await deleteDinnerPortion({ dinnerId: dinnerId });

  //delete dinner products & portions & change diet macro

  return res.sendStatus(200);
}
