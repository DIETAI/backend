import express from 'express';

//controllers
import {
  createDietEstablishmentController,
  updateDietEstablishmentController,
  deleteDietEstablishmentController,
  getDietEstablishmentController,
  getDietEstablishmentsController,
} from '../controllers/dietEstablishment.controller';

//schema
import {
  createDietEstablishmentSchema,
  deleteDietEstablishmentSchema,
  getDietEstablishmentSchema,
  updateDietEstablishmentSchema,
} from '../schema/dietEstablishments.schema';

//middleware
import requireUser from '../middleware/requireUser';
import validateSchema from '../middleware/schema.middleware';

const router = express.Router();

router.get(
  '/:dietEstablishmentId',
  [requireUser, validateSchema(getDietEstablishmentSchema)],
  getDietEstablishmentController
);

router.get('/', requireUser, getDietEstablishmentsController);

router.post(
  '/',
  [requireUser, validateSchema(createDietEstablishmentSchema)],
  createDietEstablishmentController
);

router.put(
  '/:dietEstablishmentId',
  [requireUser, validateSchema(updateDietEstablishmentSchema)],
  updateDietEstablishmentController
);

router.delete(
  '/:dietEstablishmentId',
  [requireUser, validateSchema(deleteDietEstablishmentSchema)],
  deleteDietEstablishmentController
);

export default router;
