import { Request, Response } from 'express';
import {
  CreateInvoiceInput,
  UpdateInvoiceInput,
  DeleteInvoiceInput,
} from '../../schema/account/invoice.schema';
import {
  createInvoice,
  deleteInvoice,
  getAndUpdateInvoice,
  getInvoice,
  getInvoices,
} from '../../services/account/invoice.service';

export async function createInvoiceController(
  req: Request<{}, {}, CreateInvoiceInput['body']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const body = req.body;

  const invoice = await createInvoice({
    ...body,
    user: userId,
  });

  return res.send(invoice);
}

export async function updateInvoiceController(
  req: Request<UpdateInvoiceInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;

  const invoiceId = req.params.invoiceId;
  const update = req.body;

  const invoice = await getInvoice({
    _id: invoiceId,
  });

  if (!invoice) {
    return res.sendStatus(404);
  }

  if (String(invoice.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedInvoice = await getAndUpdateInvoice({ _id: invoiceId }, update, {
    new: true,
  });

  return res.send(updatedInvoice);
}

export async function getInvoiceController(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const invoice = await getInvoice({
    user: userId,
  });

  console.log(invoice);

  if (!invoice) {
    return res.sendStatus(404);
  }

  if (String(invoice.user) !== userId) {
    return res.sendStatus(403);
  }

  return res.send(invoice);
}

export async function deleteInvoiceController(
  req: Request<DeleteInvoiceInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const invoiceId = req.params.invoiceId;

  const invoice = await getInvoice({
    _id: invoiceId,
  });

  if (!invoice) {
    return res.sendStatus(404);
  }

  if (String(invoice.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteInvoice({ _id: invoiceId });

  return res.sendStatus(200);
}
