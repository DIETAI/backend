import express from 'express';

//controllers
import {
  createProductController,
  updateProductController,
  deleteProductController,
  getProductController,
  getProductsController,
} from '../controllers/products.controller';

//schema
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from '../schema/products.schema';

//middleware
import requireUser from '../middleware/requireUser';
import validateSchema from '../middleware/schema.middleware';

const router = express.Router();

router.get(
  '/:productId',
  [requireUser, validateSchema(getProductSchema)],
  getProductController
);

router.get('/', requireUser, getProductsController);

router.post(
  '/',
  [requireUser, validateSchema(createProductSchema)],
  createProductController
);

router.put(
  '/:productId',
  [requireUser, validateSchema(updateProductSchema)],
  updateProductController
);

router.delete(
  '/:productId',
  [requireUser, validateSchema(deleteProductSchema)],
  deleteProductController
);

export default router;
