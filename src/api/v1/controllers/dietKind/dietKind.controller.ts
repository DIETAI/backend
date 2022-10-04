import { Request, Response } from 'express';
import {
  CreateDietKindInput,
  UpdateDietKindInput,
  DeleteDietKindInput,
  GetDietKindInput,
} from '../../schema/dietKind/dietKind.schema';
import {
  createDietKind,
  deleteDietKind,
  getAndUpdateDietKind,
  getDietKind,
  getDietKinds,
} from '../../services/dietKind/dietKind.service';

export async function createDietKindController(
  req: Request<{}, {}, CreateDietKindInput['body']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const body = req.body;

  const dietKind = await createDietKind({
    ...body,
    user: userId,
  });

  if (!dietKind) {
    return res.sendStatus(404);
  }

  return res.send(dietKind);
}

export async function updateDietKindController(
  req: Request<UpdateDietKindInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;

  const dietKindId = req.params.dietKindId;
  const update = req.body;

  const dietKind = await getDietKind({
    _id: dietKindId,
  });

  if (!dietKind) {
    return res.sendStatus(404);
  }

  if (String(dietKind.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedDietKind = await getAndUpdateDietKind(
    { _id: dietKindId },
    update,
    {
      new: true,
    }
  );

  return res.send(updatedDietKind);
}

export async function getDietKindController(
  req: Request<GetDietKindInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dietKindId = req.params.dietKindId;
  const dietKind = await getDietKind({
    _id: dietKindId,
  });

  if (!dietKind) {
    return res.sendStatus(404);
  }

  if (String(dietKind.user) !== userId) {
    return res.sendStatus(403);
  }

  return res.send(dietKind);
}

export async function getDietKindsController(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const dietKinds = await getDietKinds({ user: userId });

  if (!dietKinds) {
    return res.sendStatus(404);
  }

  return res.send(dietKinds);
}

export async function deleteDietKindController(
  req: Request<DeleteDietKindInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dietKindId = req.params.dietKindId;

  const dietKind = await getDietKind({
    _id: dietKindId,
  });

  if (!dietKind) {
    return res.sendStatus(404);
  }

  if (String(dietKind.user) !== userId) {
    return res.sendStatus(403);
  }

  return res.sendStatus(200);
}
