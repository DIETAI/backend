import express from 'express';

// //controllers
import {
  createProductController,
  updateProductController,
  deleteProductController,
  getProductController,
  getUserProductsController,
} from '../controllers/products.controller';

//schema
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from '../schema/products.schema';

//middleware
import { userAuthenticated } from '../middleware/user.middleware';
import validateSchema from '../middleware/schema.middleware';
import { roleCheck } from '../middleware/role.middleware';

const router = express.Router();

// router.get('/', getProductsController);

router.get(
  '/:productId',
  [
    userAuthenticated,
    roleCheck(['personal', 'dietician', 'admin']),
    validateSchema(getProductSchema),
  ],
  getProductController
);

router.get(
  '/',
  [userAuthenticated, roleCheck(['personal', 'dietician', 'admin'])],
  getUserProductsController
);

router.post(
  '/',
  [userAuthenticated, validateSchema(createProductSchema)],
  createProductController
);

router.put(
  '/:productId',
  [userAuthenticated, validateSchema(updateProductSchema)],
  updateProductController
);

router.delete(
  '/:productId',
  [userAuthenticated, validateSchema(deleteProductSchema)],
  deleteProductController
);

export default router;
