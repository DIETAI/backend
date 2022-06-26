import { Request, Response } from 'express';
import {
  CreateAssetInput,
  UpdateAssetInput,
  DeleteAssetInput,
  GetAssetInput,
} from '../schema/asset.schema';
import {
  createAsset,
  deleteAsset,
  getAndUpdateAsset,
  getAsset,
  getAssets,
} from '../services/asset.service';

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
