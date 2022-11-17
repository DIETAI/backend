import { Request, Response } from 'express';
import {
  CreateDinnerPortionInput,
  UpdateDinnerPortionInput,
  DeleteDinnerPortionInput,
  GetDinnerPortionInput,
  GetDinnerPortionsInput,
} from '../../schema/dinners/dinnerPortions.schema';
import { getAsset } from '../../services/asset.service';
import {
  createDinnerPortion,
  deleteDinnerPortion,
  getAndUpdateDinnerPortion,
  getDinnerPortion,
  getDinnerPortions,
} from '../../services/dinner/dinnerPortion.service';

import { getDinnerProduct } from '../../services/dinner/dinnerProduct.service';
import { getProduct } from '../../services/products.service';

//events
import { dinnerEmitter } from './events';

export async function createDinnerPortionController(
  req: Request<{}, {}, CreateDinnerPortionInput['body']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const body = req.body;

  const dinnerPortions = await getDinnerPortions({
    user: userId,
    dinnerId: body.dinnerId,
  });

  if (dinnerPortions.length > 0) {
    const dinnerPortion = await createDinnerPortion({
      ...body,
      user: userId,
      type: 'custom',
    });

    return res.send(dinnerPortion);
  }

  const dinnerPortion = await createDinnerPortion({
    ...body,
    user: userId,
    type: 'default',
  });

  return res.send(dinnerPortion);
}

export async function updateDinnerPortionController(
  req: Request<UpdateDinnerPortionInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;

  const dinnerPortionId = req.params.dinnerPortionId;
  const update = req.body;

  const dinnerPortion = await getDinnerPortion({
    _id: dinnerPortionId,
  });

  if (!dinnerPortion) {
    return res.sendStatus(404);
  }

  if (String(dinnerPortion.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedDinnerPortion = await getAndUpdateDinnerPortion(
    { _id: dinnerPortionId },
    update,
    {
      new: true,
    }
  );

  return res.send(updatedDinnerPortion);
}

export async function getDinnerPortionController(
  req: Request<GetDinnerPortionInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dinnerPortionId = req.params.dinnerPortionId;
  const dinnerPortion = await getDinnerPortion({
    _id: dinnerPortionId,
  });

  if (!dinnerPortion) {
    return res.sendStatus(404);
  }

  if (String(dinnerPortion.user) !== userId) {
    return res.sendStatus(403);
  }

  return res.send(dinnerPortion);
}

export async function getDinnerPortionsController(
  req: Request<GetDinnerPortionsInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dinnerId = req.params.dinnerId;
  const dinnerPortions = await getDinnerPortions({
    user: userId,
    dinnerId: dinnerId,
  });

  if (!dinnerPortions) {
    return res.sendStatus(404);
  }

  return res.send(dinnerPortions);
}

export async function getDinnerPortionsQueryController(
  req: Request<GetDinnerPortionsInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dinnerId = req.params.dinnerId;

  const dinnerPortions = await getDinnerPortions({
    user: userId,
    dinnerId: dinnerId,
  });

  if (!dinnerPortions) {
    return res.sendStatus(404);
  }

  const dinnerPortionsQuery = await Promise.all(
    dinnerPortions.map(async (dinnerPortion) => {
      const dinnerProducts = await Promise.all(
        dinnerPortion.dinnerProducts.map(async (dinnerPortionProduct) => {
          const dinnerProduct = await getDinnerProduct({
            _id: dinnerPortionProduct.dinnerProductId,
          });

          const product = await getProduct({
            _id: dinnerProduct?.productId,
          });

          const productAsset = await getAsset({ _id: product?.image });

          return {
            ...dinnerPortionProduct,
            dinnerProduct: {
              ...dinnerProduct,
              product: {
                ...product,
                imageURL: productAsset?.imageURL,
              },
            },
          };
        })
      );

      const dinnerPortionQueryObj = {
        ...dinnerPortion,
        dinnerProducts,
      };

      return dinnerPortionQueryObj;
    })
  );

  return res.send(dinnerPortionsQuery);
}

export async function deleteDinnerPortionController(
  req: Request<DeleteDinnerPortionInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dinnerPortionId = req.params.dinnerPortionId;

  const dinnerPortion = await getDinnerPortion({
    _id: dinnerPortionId,
  });

  if (!dinnerPortion) {
    return res.sendStatus(404);
  }

  if (String(dinnerPortion.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteDinnerPortion({ _id: dinnerPortionId });
  dinnerEmitter.emit('dinnerPortion:delete', dinnerPortionId);

  return res.sendStatus(200);
}
