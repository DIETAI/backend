import express from 'express';

//controllers
import {
  createClientController,
  updateClientController,
  deleteClientController,
  getClientController,
  getClientsController,
} from '../controllers/client.controller';

//schema
import {
  createClientSchema,
  deleteClientSchema,
  getClientSchema,
  updateClientSchema,
} from '../schema/client.schema';

//middleware
import requireUser from '../middleware/requireUser';
import validateSchema from '../middleware/schema.middleware';

const router = express.Router();

router.get(
  '/:clientId',
  [requireUser, validateSchema(getClientSchema)],
  getClientController
);

router.get('/', requireUser, getClientsController);

router.post(
  '/',
  [requireUser, validateSchema(createClientSchema)],
  createClientController
);

router.put(
  '/:clientId',
  [requireUser, validateSchema(updateClientSchema)],
  updateClientController
);

router.delete(
  '/:clientId',
  [requireUser, validateSchema(deleteClientSchema)],
  deleteClientController
);

export default router;
