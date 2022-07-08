import express from 'express';

//controllers
import {
  createDinnerController,
  updateDinnerController,
  deleteDinnerController,
  getDinnerController,
  getDinnersController,
} from '../../controllers/dinner/dinner.controller';

//schema
import {
  createDinnerSchema,
  deleteDinnerSchema,
  getDinnerSchema,
  updateDinnerSchema,
} from '../../schema/dinners/dinner.schema';

//middleware
import requireUser from '../../middleware/requireUser';
import validateSchema from '../../middleware/schema.middleware';

const router = express.Router();

router.get(
  '/:dinnerId',
  [requireUser, validateSchema(getDinnerSchema)],
  getDinnerController
);

router.get('/', requireUser, getDinnersController);

router.post(
  '/',
  [requireUser, validateSchema(createDinnerSchema)],
  createDinnerController
);

router.put(
  '/:dinnerId',
  [requireUser, validateSchema(updateDinnerSchema)],
  updateDinnerController
);

router.delete(
  '/:dinnerId',
  [requireUser, validateSchema(deleteDinnerSchema)],
  deleteDinnerController
);

export default router;
