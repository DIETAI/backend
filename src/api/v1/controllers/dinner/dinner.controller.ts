import { Request, Response } from 'express';
import DinnerModel from '../../models/dinners/dinner.model';
import {
  CreateDinnerInput,
  UpdateDinnerInput,
  DeleteDinnerInput,
  GetDinnerInput,
  GetDinnersInput,
} from '../../schema/dinners/dinner.schema';
import { getAsset } from '../../services/asset.service';
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

  const dinnerAsset = await getAsset({ _id: dinner.image });

  const dinnerGalleryAssets =
    dinner.gallery && dinner.gallery.length > 0
      ? await Promise.all(
          dinner.gallery?.map(async (galleryAsset) => {
            const dinnerAsset = await getAsset({ _id: galleryAsset });
            return dinnerAsset;
          })
        )
      : [];

  if (!dinnerAsset) {
    return res.send({
      ...dinner,
      imageObj: undefined,
      galleryArr: dinnerGalleryAssets,
    });
  }

  return res.send({
    ...dinner,
    imageObj: dinnerAsset,
    galleryArr: dinnerGalleryAssets,
  });
}

export async function getDinnersController(
  req: Request<{}, {}, {}, GetDinnersInput['query']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const queryPage = req.query.page;
  const itemsCount = req.query.itemsCount;

  if (queryPage && itemsCount) {
    const page = parseInt(queryPage);
    const skip = (page - 1) * parseInt(itemsCount); // 1 * 20 = 20

    const countPromise = DinnerModel.estimatedDocumentCount();
    const dinnersPromise = DinnerModel.find({ user: userId })
      .limit(parseInt(itemsCount))
      .skip(skip);

    const [count, dinners] = await Promise.all([countPromise, dinnersPromise]);

    const dinnersQuery = await Promise.all(
      dinners.map(async (dinnerDocument) => {
        const dinner = dinnerDocument.toObject();
        if (!dinner.image) {
          return { ...dinner, imageObj: undefined };
        }

        const dinnerAsset = await getAsset({ _id: dinner.image });

        if (!dinnerAsset) {
          return { ...dinner, imageObj: undefined };
        }

        return { ...dinner, imageObj: dinnerAsset };
      })
    );

    const pageCount = count / parseInt(itemsCount); // 400 items / 20 = 20
    console.log({ dinnerCounts: count, dinnersLength: dinnersQuery.length });

    if (!count || !dinnersQuery) {
      return res.sendStatus(404);
    }

    return res.send({
      pagination: {
        count,
        pageCount,
      },
      dinners: dinnersQuery,
    });
  }

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
