import express from 'express';

//controllers
import { dinnerPortionGenerateController } from '../controllers/dietAIGenerate/dietAIDinnerPortionGenerate.controller';

//schema
import { generateDinnerPortionSchema } from '../schema/dietAIGenerate/dietAIDinnerPortionGenerate.schema';

//middleware
import requireUser from '../middleware/requireUser';
import validateSchema from '../middleware/schema.middleware';

const router = express.Router();

router.post(
  '/',
  [requireUser, validateSchema(generateDinnerPortionSchema)],
  dinnerPortionGenerateController
);

export default router;
