import { Request, Response } from 'express';
import {
  CreateDietEstablishmentInput,
  UpdateDietEstablishmentInput,
  DeleteDietEstablishmentInput,
  GetDietEstablishmentInput,
} from '../schema/dietEstablishments.schema';
import {
  createDietEstablishment,
  deleteDietEstablishment,
  getAndUpdateDietEstablishment,
  getDietEstablishment,
  getDietEstablishments,
} from '../services/dietEstablishment.service';

export async function createDietEstablishmentController(
  req: Request<{}, {}, CreateDietEstablishmentInput['body']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const body = req.body;

  const dietEstablishment = await createDietEstablishment({
    ...body,
    user: userId,
  });

  return res.send(dietEstablishment);
}

export async function updateDietEstablishmentController(
  req: Request<UpdateDietEstablishmentInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;

  const dietEstablishmentId = req.params.dietEstablishmentId;
  const update = req.body;

  const dietEstablishment = await getDietEstablishment({
    _id: dietEstablishmentId,
  });

  if (!dietEstablishment) {
    return res.sendStatus(404);
  }

  if (String(dietEstablishment.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedDietEstablishment = await getAndUpdateDietEstablishment(
    { _id: dietEstablishmentId },
    update,
    {
      new: true,
    }
  );

  return res.send(updatedDietEstablishment);
}

export async function getDietEstablishmentController(
  req: Request<GetDietEstablishmentInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dietEstablishmentId = req.params.dietEstablishmentId;
  const dietEstablishment = await getDietEstablishment({
    _id: dietEstablishmentId,
  });

  if (!dietEstablishment) {
    return res.sendStatus(404);
  }

  if (String(dietEstablishment.user) !== userId) {
    return res.sendStatus(403);
  }

  return res.send(dietEstablishment);
}

export async function getDietEstablishmentsController(
  req: Request,
  res: Response
) {
  const userId = res.locals.user._id;
  const dietEstablishments = await getDietEstablishments({ user: userId });

  if (!dietEstablishments) {
    return res.sendStatus(404);
  }

  return res.send(dietEstablishments);
}

export async function deleteDietEstablishmentController(
  req: Request<DeleteDietEstablishmentInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dietEstablishmentId = req.params.dietEstablishmentId;

  const dietEstablishment = await getDietEstablishment({
    _id: dietEstablishmentId,
  });

  if (!dietEstablishment) {
    return res.sendStatus(404);
  }

  if (String(dietEstablishment.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteDietEstablishment({ _id: dietEstablishmentId });

  return res.sendStatus(200);
}
