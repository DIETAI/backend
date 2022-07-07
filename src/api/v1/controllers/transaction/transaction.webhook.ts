import { createTransaction } from '../../services/transaction/transaction.service';
import { Stripe } from 'stripe';
import { Request, Response } from 'express';
import { buffer } from 'micro';

// const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const stripeSecret = process.env.STRIPE_SECRET;
const stripe = require('stripe')(stripeSecret);

const stripeWebhookSecret = 'whsec_XGPVFywdGsHon0J0ZtrnfnZfpcAB4RE2';

//transactionWebhook
export async function createStripePaymentWebhook(req: Request, res: Response) {
  const sig = req.headers['stripe-signature'];

  if (!sig) {
    return res.sendStatus(404);
  }

  console.log({ sig });

  console.log(req.body);
  // const rawBody = JSON.stringify(req.body, null, 2);
  console.log({ rawBody: req.rawBody });
  // const rawBodyAsBuffer = new Buffer(req.raw, 'base64');
  // console.log({ raw: req.raw });
  // console.log({ req });

  let event;

  try {
    //problem z req.rawBody
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      stripeWebhookSecret
    );

    console.log({ event });
  } catch (err: any) {
    res.status(400).send(`Webhook Error: ${err}`);
    console.log({ err: err.message });
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
