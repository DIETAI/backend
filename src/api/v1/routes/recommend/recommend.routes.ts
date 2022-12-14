import express from 'express';

//controllers
import { getDietDinnersToDinnerRecommendController } from '../../controllers/diet/dietDinner.controller';

const router = express.Router();

router.get('/dietDinners', getDietDinnersToDinnerRecommendController); //correct

export default router;
