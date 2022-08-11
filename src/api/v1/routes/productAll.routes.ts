import express from 'express';

//controllers
import { getAllProductsController } from '../controllers/products.controller';

//middleware
import requireUser from '../middleware/requireUser';
import validateSchema from '../middleware/schema.middleware';

const router = express.Router();

router.get('/', getAllProductsController);

export default router;
