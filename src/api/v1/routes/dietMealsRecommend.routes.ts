import express from 'express';

//controllers
import { getDietMealsToRecommendController } from '../controllers/diet/dietMeal.controller';
import { getAllDietDinnersToMealRecommendController } from '../controllers/diet/dietDinner.controller';

const router = express.Router();

router.get('/', getDietMealsToRecommendController);
router.get('/dinners', getAllDietDinnersToMealRecommendController); //correct

export default router;
