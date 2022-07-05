import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import TransactionModel from '../../models/transaction/transaction.model';
import {
  ITransactionInput,
  ITransactionDocument,
} from '../../interfaces/transaction/transaction.interfaces';

import { databaseResponseTimeHistogram } from '../../utils/metrics';
import { Stripe } from 'stripe';

const stripeSecret = process.env.STRIPE_SECRET;
const stripe = require('stripe')(stripeSecret);

export async function createStripeOrder(stripePriceId: string, userId: string) {
  const metricsLabels = {
    operation: 'createStripeOrder',
  };
  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const result: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create({
        client_reference_id: userId,
        success_url: 'http://localhost:3000/payment/success',
        cancel_url: 'http://localhost:3000/payment/cancel',
        payment_method_types: ['card'], //p24
        line_items: [{ price: stripePriceId, quantity: 1 }],
        mode: 'subscription', //payment
      });

    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function createTransaction(input: ITransactionInput) {
  const metricsLabels = {
    operation: 'createTransaction',
  };
  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const result = await TransactionModel.create(input);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });
    throw e;
  }
}
