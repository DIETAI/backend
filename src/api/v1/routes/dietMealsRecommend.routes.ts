import express from 'express';

//controllers
import { getDietMealsToRecommendController } from '../controllers/diet/dietMeal.controller';

const router = express.Router();

router.get('/', getDietMealsToRecommendController);

export default router;
