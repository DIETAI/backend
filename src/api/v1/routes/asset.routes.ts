import express from 'express';

//controllers
import {
  createAssetController,
  updateAssetController,
  deleteAssetController,
  getAssetController,
  getAssetsController,
} from '../controllers/asset.controller';

//schema
import {
  createAssetSchema,
  deleteAssetSchema,
  getAssetSchema,
  updateAssetSchema,
} from '../schema/asset.schema';

//middleware
import requireUser from '../middleware/requireUser';
import validateSchema from '../middleware/schema.middleware';

const router = express.Router();

router.get(
  '/:assetId',
  [requireUser, validateSchema(getAssetSchema)],
  getAssetController
);

router.get('/', requireUser, getAssetsController);

router.post(
  '/',
  [requireUser, validateSchema(createAssetSchema)],
  createAssetController
);

router.put(
  '/:assetId',
  [requireUser, validateSchema(updateAssetSchema)],
  updateAssetController
);

router.delete(
  '/:assetId',
  [requireUser, validateSchema(deleteAssetSchema)],
  deleteAssetController
);

export default router;
