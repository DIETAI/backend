import express from 'express';

//controllers
import {
  createDietDinnerController,
  updateDietDinnerController,
  deleteDietDinnerController,
  getDietDinnerController,
  getDietDinnersController,
} from '../controllers/diet/dietDinner.controller';

//schema
import {
  createDietDinnerSchema,
  deleteDietDinnerSchema,
  getDietDinnerSchema,
  getDietDinnersSchema,
  updateDietDinnerSchema,
} from '../schema/diet/dietDinner.schema';

//middleware
import requireUser from '../middleware/requireUser';
import validateSchema from '../middleware/schema.middleware';

const router = express.Router();

router.get(
  '/:dietDinnerId',
  [requireUser, validateSchema(getDietDinnerSchema)],
  getDietDinnerController
);

router.get(
  '/meal/:dietMealId',
  [requireUser, validateSchema(getDietDinnersSchema)],
  getDietDinnersController
);

router.post(
  '/',
  [requireUser, validateSchema(createDietDinnerSchema)],
  createDietDinnerController
);

router.put(
  '/:dietDinnerId',
  [requireUser, validateSchema(updateDietDinnerSchema)],
  updateDietDinnerController
);

router.delete(
  '/:dietDinnerId',
  [requireUser, validateSchema(deleteDietDinnerSchema)],
  deleteDietDinnerController
);

export default router;
