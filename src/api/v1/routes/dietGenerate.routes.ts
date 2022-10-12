import express from 'express';

//controllers
import { mealGenerateController } from '../controllers/dietAIGenerate/dietAIMealGenerate.controller';
import { dayGenerateController } from '../controllers/dietAIGenerate/dietAIDayGenerate.controller';

//schema
import { generateMealSchema } from '../schema/dietAIGenerate/dietAIMealGenerate.schema';
import { generateDaySchema } from '../schema/dietAIGenerate/dietAIDayGenerate.schema';

//middleware
import requireUser from '../middleware/requireUser';
import validateSchema from '../middleware/schema.middleware';

const router = express.Router();

router.post(
  '/meal',
  [requireUser, validateSchema(generateMealSchema)],
  mealGenerateController
);
router.post(
  '/day',
  [requireUser, validateSchema(generateDaySchema)],
  dayGenerateController
);

export default router;
