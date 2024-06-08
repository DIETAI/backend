import { Request, Response } from 'express';
import DietEstablishmentModel from '../models/dietEstablishments.model';
import {
  CreateDietEstablishmentInput,
  UpdateDietEstablishmentInput,
  DeleteDietEstablishmentInput,
  GetDietEstablishmentInput,
  GetDietEstablishmentsInput,
} from '../schema/dietEstablishments.schema';
import { getClient } from '../services/client.service';
import {
  createDietEstablishment,
  deleteDietEstablishment,
  getAndUpdateDietEstablishment,
  getDietEstablishment,
  getDietEstablishments,
} from '../services/dietEstablishment.service';
import { getDietKind } from '../services/dietKind/dietKind.service';
import { getMeasurement } from '../services/measurement.service';

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

  console.log({ dietEstablishment });

  return res.send(dietEstablishment);
}

//do usunięcia
export async function getDietEstablishmentQueryController(
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

  const dietEstablishmentClient = await getClient({
    _id: dietEstablishment.client,
  });
  const dietEstablishmentMeasurement = await getMeasurement({
    _id: dietEstablishment.measurementId,
  });
  const dietEstablishmentDietKind = await getDietKind({
    _id: dietEstablishment.dietKind,
  });

  const dietEstablishmentQueryObj = {
    ...dietEstablishment,
    patientObj: dietEstablishmentClient,
    measurementObj: dietEstablishmentMeasurement,
    dietKindObj: dietEstablishmentDietKind,
  };

  return res.send(dietEstablishmentQueryObj);
}

// export async function getDietEstablishmentsController(
//   req: Request,
//   res: Response
// ) {
//   const userId = res.locals.user._id;
//   const dietEstablishments = await getDietEstablishments({ user: userId });

//   if (!dietEstablishments) {
//     return res.sendStatus(404);
//   }

//   const dietEstablishmentQuery = await Promise.all(
//     dietEstablishments.map(async (dietEstablishment) => {
//       const client = await getClient({ _id: dietEstablishment.client });

//       return {
//         ...dietEstablishment,
//         patient: {
//           fullName: client?.name + ' ' + client?.lastName,
//         },
//       };
//     })
//   );

//   return res.send(dietEstablishmentQuery);
// }

export async function getDietEstablishmentsController(
  req: Request<{}, {}, {}, GetDietEstablishmentsInput['query']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const queryPage = req.query.page;
  const itemsCount = req.query.itemsCount;

  if (queryPage && itemsCount) {
    const page = parseInt(queryPage);
    const skip = (page - 1) * parseInt(itemsCount); // 1 * 20 = 20

    const countPromise = DietEstablishmentModel.estimatedDocumentCount();
    const dietEstablishmentsPromise = DietEstablishmentModel.find({
      user: userId,
    })
      .populate({
        path: 'client',
        select: ['_id', 'name', 'lastName'],
      })
      .populate({
        path: 'dietKind',
        select: ['_id', 'name', 'type'],
      })
      .populate({
        path: 'measurementId',
        select: ['_id', 'name', 'cpm'],
      })
      .limit(parseInt(itemsCount))
      .skip(skip);

    const [count, dietEstablishments] = await Promise.all([
      countPromise,
      dietEstablishmentsPromise,
    ]);

    const pageCount = count / parseInt(itemsCount); // 400 items / 20 = 20

    if (!count || !dietEstablishments) {
      return res.sendStatus(404);
    }

    return res.send({
      pagination: {
        count,
        pageCount,
      },
      dietEstablishments,
    });
  }

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
