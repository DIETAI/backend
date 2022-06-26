import express from 'express';

// //controllers
import {
  createUserController,
  getUserController,
} from '../controllers/user.controller';

//schema
import { createUserSchema } from '../schema/user.schema';

//middleware
import requireUser from '../middleware/requireUser';
import validateSchema from '../middleware/schema.middleware';
import { roleCheck } from '../middleware/role.middleware';

const router = express.Router();

router.get('/', [requireUser], getUserController);
router.post('/', [validateSchema(createUserSchema)], createUserController);

export default router;
