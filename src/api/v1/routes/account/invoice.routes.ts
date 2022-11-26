import express from 'express';

//controllers
import {
  createInvoiceController,
  updateInvoiceController,
  deleteInvoiceController,
  getInvoiceController,
  getInvoicesController,
} from '../../controllers/account/invoice.controller';

//schema
import {
  createInvoiceSchema,
  deleteInvoiceSchema,
  getInvoiceSchema,
  updateInvoiceSchema,
} from '../../schema/account/invoice.schema';

//middleware
import requireUser from '../../middleware/requireUser';
import validateSchema from '../../middleware/schema.middleware';

const router = express.Router();

router.get(
  '/:invoiceId',
  [requireUser, validateSchema(getInvoiceSchema)],
  getInvoiceController
);

router.get('/', requireUser, getInvoicesController);

router.post(
  '/',
  [requireUser, validateSchema(createInvoiceSchema)],
  createInvoiceController
);

router.put(
  '/:invoiceId',
  [requireUser, validateSchema(updateInvoiceSchema)],
  updateInvoiceController
);

router.delete(
  '/:invoiceId',
  [requireUser, validateSchema(deleteInvoiceSchema)],
  deleteInvoiceController
);

export default router;
