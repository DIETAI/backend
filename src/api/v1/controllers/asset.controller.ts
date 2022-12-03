import { Request, Response } from 'express';
import {
  CreateAssetInput,
  UpdateAssetInput,
  DeleteAssetInput,
  GetAssetInput,
  UploadImageInput,
} from '../schema/asset.schema';
import {
  uploadImage,
  createAsset,
  deleteAsset,
  getAndUpdateAsset,
  getAsset,
  getAssets,
} from '../services/asset.service';

import { IAssetDocument } from '../interfaces/assets.interfaces';

const roundValue = (value: number) => {
  return Math.round(value * 1e2) / 1e2;
};

const sumImagesSize = (assets: IAssetDocument[]) => {
  const imageSize = roundValue(
    assets.reduce((acc, asset) => acc + Number(asset.size), 0)
  );

  return imageSize;
};

export async function uploadImageController(
  req: Request<{}, {}, UploadImageInput['body']>,
  res: Response
) {
  const body = req.body;
  const userId = res.locals.user._id;

  const maxImagesSize = 2000000000; //2GB
  const assets = await getAssets({ user: userId });

  const allAssetsSize = sumImagesSize(assets) + body.size;

  if (allAssetsSize > maxImagesSize) {
    return res.sendStatus(404);
  }

  const image = await uploadImage({
    ...body,
  });

  return res.send({ url: image.url, key: image.key });
}

export async function createAssetController(
  req: Request<{}, {}, CreateAssetInput['body']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const body = req.body;

  const asset = await createAsset({
    ...body,
    user: userId,
  });

  return res.send(asset);
}

export async function updateAssetController(
  req: Request<UpdateAssetInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;

  const assetId = req.params.assetId;
  const update = req.body;

  const asset = await getAsset({
    _id: assetId,
  });

  if (!asset) {
    return res.sendStatus(404);
  }

  if (String(asset.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedAsset = await getAndUpdateAsset({ _id: assetId }, update, {
    new: true,
  });

  return res.send(updatedAsset);
}

export async function getAssetController(
  req: Request<GetAssetInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const assetId = req.params.assetId;
  const asset = await getAsset({
    _id: assetId,
  });

  if (!asset) {
    return res.sendStatus(404);
  }

  if (String(asset.user) !== userId) {
    return res.sendStatus(403);
  }

  return res.send(asset);
}

export async function getAssetsController(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const assets = await getAssets({ user: userId });

  if (!assets) {
    return res.sendStatus(404);
  }

  return res.send(assets);
}

export async function deleteAssetController(
  req: Request<DeleteAssetInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const assetId = req.params.assetId;

  const asset = await getAsset({
    _id: assetId,
  });

  if (!asset) {
    return res.sendStatus(404);
  }

  if (String(asset.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteAsset({ _id: assetId });

  return res.sendStatus(200);
}
