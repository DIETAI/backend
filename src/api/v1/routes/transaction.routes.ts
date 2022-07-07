import express from 'express';

//controllers
import { createStripeOrderSessionController } from '../controllers/transaction/transaction.controller';

import { createStripePaymentWebhook } from '../controllers/transaction/transaction.webhook';

//schema
import {
  createTransactionSchema,
  deleteTransactionSchema,
  getTransactionSchema,
  updateTransactionSchema,
} from '../schema/transaction/transaction.schema';

//middleware
import requireUser from '../middleware/requireUser';
import validateSchema from '../middleware/schema.middleware';

const router = express.Router();

router.post(
  '/',
  [requireUser, validateSchema(createTransactionSchema)],
  createStripeOrderSessionController
);

router.post(
  '/webhook',
  // express.raw({ type: '*/*' }),
  // express.raw({ type: 'application/json' }),
  createStripePaymentWebhook
);

export default router;
