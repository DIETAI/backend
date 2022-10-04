import express from 'express';

//controllers
import {
  createDietMealController,
  updateDietMealController,
  deleteDietMealController,
  getDietMealController,
  getDietMealsController,
  getAllDietMealsController,
  getDietMealsToRecommendController,
} from '../controllers/diet/dietMeal.controller';

//schema
import {
  createDietDayMealSchema,
  deleteDietDayMealSchema,
  getDietDayMealSchema,
  getDietDayMealsSchema,
  updateDietDayMealSchema,
} from '../schema/diet/dietMeal.schema';

//middleware
import requireUser from '../middleware/requireUser';
import validateSchema from '../middleware/schema.middleware';

const router = express.Router();

router.get(
  '/:dietMealId',
  [requireUser, validateSchema(getDietDayMealSchema)],
  getDietMealController
);

router.get(
  '/day/:dietDayId',
  [requireUser, validateSchema(getDietDayMealsSchema)],
  getDietMealsController
);

router.get('/', getAllDietMealsController);

router.post(
  '/',
  [requireUser, validateSchema(createDietDayMealSchema)],
  createDietMealController
);

router.put(
  '/:dietMealId',
  [requireUser, validateSchema(updateDietDayMealSchema)],
  updateDietMealController
);

router.delete(
  '/:dietMealId',
  [requireUser, validateSchema(deleteDietDayMealSchema)],
  deleteDietMealController
);

export default router;
