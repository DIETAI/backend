import express from 'express';

//controllers
import {
  createDietController,
  updateDietController,
  deleteDietController,
  getDietController,
  getDietPopulateController,
  getDietsController,
  getDietQueryController,
} from '../controllers/diet/diet.controller';

//schema
import {
  createDietSchema,
  deleteDietSchema,
  getDietSchema,
  updateDietSchema,
} from '../schema/diet/diet.schema';

//middleware
import requireUser from '../middleware/requireUser';
import validateSchema from '../middleware/schema.middleware';

const router = express.Router();

router.get(
  '/:dietId',
  [requireUser, validateSchema(getDietSchema)],
  getDietController
);

router.get(
  '/:dietId/populate',
  [requireUser, validateSchema(getDietSchema)],
  getDietPopulateController
);

// router.get('/:dietId/days/:dayId/meals/:mealId/dinners/:dinnerId/')

router.get(
  '/:dietId/query',
  [requireUser, validateSchema(getDietSchema)],
  getDietQueryController
);

router.get('/', requireUser, getDietsController);

router.post(
  '/',
  [requireUser, validateSchema(createDietSchema)],
  createDietController
);

router.put(
  '/:dietId',
  [requireUser, validateSchema(updateDietSchema)],
  updateDietController
);

router.delete(
  '/:dietId',
  [requireUser, validateSchema(deleteDietSchema)],
  deleteDietController
);

export default router;
