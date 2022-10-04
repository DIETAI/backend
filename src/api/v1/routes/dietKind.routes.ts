import express from 'express';

//controllers
import {
  createDietKindController,
  updateDietKindController,
  deleteDietKindController,
  getDietKindController,
  getDietKindsController,
} from '../controllers/dietKind/dietKind.controller';

//schema
import {
  createDietKindSchema,
  deleteDietKindSchema,
  getDietKindSchema,
  updateDietKindSchema,
} from '../schema/dietKind/dietKind.schema';

//middleware
import requireUser from '../middleware/requireUser';
import validateSchema from '../middleware/schema.middleware';

const router = express.Router();

router.get(
  '/:dietKindId',
  [requireUser, validateSchema(getDietKindSchema)],
  getDietKindController
);

// router.get('/:dietId/days/:dayId/meals/:mealId/dinners/:dinnerId/')

router.get('/', requireUser, getDietKindsController);

router.post(
  '/',
  [requireUser, validateSchema(createDietKindSchema)],
  createDietKindController
);

router.put(
  '/:dietKindId',
  [requireUser, validateSchema(updateDietKindSchema)],
  updateDietKindController
);

router.delete(
  '/:dietKindId',
  [requireUser, validateSchema(deleteDietKindSchema)],
  deleteDietKindController
);

export default router;
