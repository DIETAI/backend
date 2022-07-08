import express from 'express';

//controllers
import {
  createDinnerProductController,
  updateDinnerProductController,
  deleteDinnerProductController,
  getDinnerProductController,
  getDinnerProductsController,
} from '../../controllers/dinner/dinnerProduct.controller';

//schema
import {
  createDinnerProductSchema,
  deleteDinnerProductSchema,
  getDinnerProductSchema,
  getDinnerProductsSchema,
  updateDinnerProductSchema,
} from '../../schema/dinners/dinnerProducts.schema';

//middleware
import requireUser from '../../middleware/requireUser';
import validateSchema from '../../middleware/schema.middleware';

const router = express.Router();

router.get(
  '/:dinnerProductId',
  [requireUser, validateSchema(getDinnerProductSchema)],
  getDinnerProductController
);

router.get(
  '/dinner/:dinnerId',
  [requireUser, validateSchema(getDinnerProductsSchema)],
  getDinnerProductsController
);

router.post(
  '/',
  [requireUser, validateSchema(createDinnerProductSchema)],
  createDinnerProductController
);

router.put(
  '/:dinnerProductId',
  [requireUser, validateSchema(updateDinnerProductSchema)],
  updateDinnerProductController
);

router.delete(
  '/:dinnerProductId',
  [requireUser, validateSchema(deleteDinnerProductSchema)],
  deleteDinnerProductController
);

export default router;
