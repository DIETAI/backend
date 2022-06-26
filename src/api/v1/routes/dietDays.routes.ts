import express from 'express';

//controllers
import {
  createDietDayController,
  updateDietDayController,
  deleteDietDayController,
  getDietDayController,
  getDietDaysController,
} from '../controllers/diet/dietDay.controller';

//schema
import {
  createDietDaySchema,
  deleteDietDaySchema,
  getDietDaySchema,
  getDietDaysSchema,
  updateDietDaySchema,
} from '../schema/diet/dietDay.schema';

//middleware
import requireUser from '../middleware/requireUser';
import validateSchema from '../middleware/schema.middleware';

const router = express.Router();

router.get(
  '/:dietDayId',
  [requireUser, validateSchema(getDietDaySchema)],
  getDietDayController
);

router.get(
  '/diet/:dietId',
  [requireUser, validateSchema(getDietDaysSchema)],
  getDietDaysController
);

router.post(
  '/',
  [requireUser, validateSchema(createDietDaySchema)],
  createDietDayController
);

router.put(
  '/:dietDayId',
  [requireUser, validateSchema(updateDietDaySchema)],
  updateDietDayController
);

router.delete(
  '/:dietDayId',
  [requireUser, validateSchema(deleteDietDaySchema)],
  deleteDietDayController
);

export default router;
