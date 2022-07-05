import config from 'config';
const stripeSecret = config.get<string>('stripeSecret');
const stripe = require('stripe')(stripeSecret);

import { databaseResponseTimeHistogram } from '../../utils/metrics';

interface ISubscriptionPlanStripeInput {
  name: string;
  description?: string;
  imageURL: string;
  defaultPrice: number;
}

export async function createStripeSubscriptionPlan(
  input: ISubscriptionPlanStripeInput
) {
  const metricsLabels = {
    operation: 'createStripeSubscriptionPlan',
  };

  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const result = await stripe.products.create({
      name: input.name,
      description: input.description,
      images: [input.imageURL],
      default_price_data: {
        currency: 'pln',
        unit_amount: input.defaultPrice * 100,
      },
    });

    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

interface ISubscriptionPlanPriceStripeInput {
  stripeProductId: string;
  price: number;
  intervalMonthCall: 1 | 3 | 6; //1month | 3months | 6months
}

export async function createStripeSubscriptionPlanPrice({
  stripeProductId,
  price,
  intervalMonthCall,
}: ISubscriptionPlanPriceStripeInput) {
  const metricsLabels = {
    operation: 'createStripeSubscriptionPlanPrice',
  };

  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const result = await stripe.prices.create({
      unit_amount: price * 100,
      currency: 'pln',
      recurring: { interval: 'month', interval_count: intervalMonthCall },
      product: stripeProductId,
    });

    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function deleteStripeSubscriptionPlan(productId: string) {
  const deleted = await stripe.products.del(productId);
  return deleted;
}
