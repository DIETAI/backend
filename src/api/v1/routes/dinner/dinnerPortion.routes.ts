import express from 'express';

//controllers
import {
  createDinnerPortionController,
  updateDinnerPortionController,
  deleteDinnerPortionController,
  getDinnerPortionController,
  getDinnerPortionsController,
  getDinnerPortionsQueryController,
} from '../../controllers/dinner/dinnerPortion.controller';

//schema
import {
  createDinnerPortionSchema,
  deleteDinnerPortionSchema,
  getDinnerPortionSchema,
  getDinnerPortionsSchema,
  updateDinnerPortionSchema,
} from '../../schema/dinners/dinnerPortions.schema';

//middleware
import requireUser from '../../middleware/requireUser';
import validateSchema from '../../middleware/schema.middleware';

const router = express.Router();

router.get(
  '/:dinnerPortionId',
  [requireUser, validateSchema(getDinnerPortionSchema)],
  getDinnerPortionController
);

router.get(
  '/dinner/:dinnerId',
  [requireUser, validateSchema(getDinnerPortionsSchema)],
  getDinnerPortionsController
);

router.get(
  '/dinner/:dinnerId/query',
  [requireUser, validateSchema(getDinnerPortionsSchema)],
  getDinnerPortionsQueryController
);

router.post(
  '/',
  [requireUser, validateSchema(createDinnerPortionSchema)],
  createDinnerPortionController
);

router.put(
  '/:dinnerPortionId',
  [requireUser, validateSchema(updateDinnerPortionSchema)],
  updateDinnerPortionController
);

router.delete(
  '/:dinnerPortionId',
  [requireUser, validateSchema(deleteDinnerPortionSchema)],
  deleteDinnerPortionController
);

export default router;
