import { createTransaction } from '../../services/transaction/transaction.service';
import { Stripe } from 'stripe';
import { Request, Response } from 'express';

const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const stripeSecret = process.env.STRIPE_SECRET;
const stripe = require('stripe')(stripeSecret);

//transactionWebhook
export async function createStripePaymentWebhook(req: Request, res: Response) {
  const stripeSignature = req.headers['stripe-signature'];

  if (!stripeSignature) {
    return res.sendStatus(404);
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      stripeSignature,
      stripeWebhookSecret
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err}`);
    return;
  }

  console.log(event);

  // // Handle the event
  // switch (event.type) {
  //   case 'checkout.session.completed':
  //     const session = event.data.object;
  //     // Then define and call a function to handle the event checkout.session.completed
  //     break;
  //   // ... handle other event types
  //   default:
  //     console.log(`Unhandled event type ${event.type}`);
  // }

  // Handle the event
  console.log(`Unhandled event type ${event.type}`);

  // Return a 200 response to acknowledge receipt of the event
  res.send(event.type);

  //   const body = req.body;

  //   //create transaction
  //   const subscriptionPlan = await createSubscriptionPlan({
  //     ...body,
  //     stripeId: stripeSubscriptionPlan.id,
  //     variants: subscriptionPlanStripePrices,
  //   });

  //   if (!subscriptionPlan) {
  //     return res.sendStatus(404);
  //   }

  //   return res.send(subscriptionPlan);
}
