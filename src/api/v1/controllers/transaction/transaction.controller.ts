import { Request, Response } from 'express';
import { Stripe } from 'stripe';
import {
  CreateTransactionInput,
  UpdateTransactionInput,
  DeleteTransactionInput,
  GetTransactionInput,
} from '../../schema/transaction/transaction.schema';

import { createStripeOrder } from '../../services/transaction/transaction.service';
import { getSubscriptionPlan } from '../../services/subscriptionPlan/subscriptionPlan.service';

export async function createStripeOrderSessionController(
  req: Request<{}, {}, CreateTransactionInput['body']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const body = req.body;

  //getByProductId
  const subscriptionPlan = await getSubscriptionPlan({
    _id: body.subscriptionPlanId,
  });

  if (!subscriptionPlan) {
    return res.sendStatus(404);
  }

  //findVariantByStripePriceId
  const variant = subscriptionPlan.variants.find(
    (variant) => variant.stripePriceId === body.stripePriceId
  );

  if (!variant) {
    return res.sendStatus(404);
  }

  //create transaction
  const stripeSession = await createStripeOrder(variant.stripePriceId, userId);

  if (!stripeSession) {
    return res.sendStatus(404);
  }

  return res.send(stripeSession);
}
