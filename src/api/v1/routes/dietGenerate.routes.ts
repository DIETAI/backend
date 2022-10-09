import express from 'express';

//controllers
import { mealGenerateController } from '../controllers/dietAIGenerate/dietAIMealGenerate.controller';

//schema
import { generateMealSchema } from '../schema/dietAIGenerate/dietAIMealGenerate.schema';

//middleware
import requireUser from '../middleware/requireUser';
import validateSchema from '../middleware/schema.middleware';

const router = express.Router();

router.post(
  '/meal',
  [requireUser, validateSchema(generateMealSchema)],
  mealGenerateController
);

export default router;
