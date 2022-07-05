import { Request, Response } from 'express';
import { Stripe } from 'stripe';
import {
  CreateSubscriptionPlanInput,
  UpdateSubscriptionPlanInput,
  DeleteSubscriptionPlanInput,
  GetSubscriptionPlanInput,
} from '../../schema/subscriptionPlan/subscriptionPlan.schema';
import {
  createSubscriptionPlan,
  deleteSubscriptionPlan,
  getAndUpdateSubscriptionPlan,
  getSubscriptionPlan,
  getSubscriptionPlans,
} from '../../services/subscriptionPlan/subscriptionPlan.service';

import { getAsset } from '../../services/asset.service';
import {
  createStripeSubscriptionPlan,
  createStripeSubscriptionPlanPrice,
  deleteStripeSubscriptionPlan,
} from '../../services/subscriptionPlan/stripe.service';

export async function createSubscriptionPlanController(
  req: Request<{}, {}, CreateSubscriptionPlanInput['body']>,
  res: Response
) {
  const body = req.body;

  //getAsset
  const asset = await getAsset({ _id: body.image });
  if (!asset) {
    return res.sendStatus(404);
  }

  //create stripeSubscriptionPlan
  const imageURL = asset.imageURL;

  const stripeSubscriptionPlan: Stripe.Product =
    await createStripeSubscriptionPlan({
      name: body.name,
      description: body.description || undefined,
      defaultPrice: body.price,
      imageURL,
    });

  if (!stripeSubscriptionPlan) {
    return res.sendStatus(404);
  }

  //create stripeSubscriptionPlanPrices
  const subscriptionPlanVariants = body.variants;

  const getIntervalMonthCall = (time: '1month' | '3months' | '6months') => {
    if (time === '1month') {
      return 1;
    }
    if (time === '3months') {
      return 3;
    }

    return 6;
  };

  const subscriptionPlanStripePrices = await Promise.all(
    subscriptionPlanVariants.map(async (variant) => {
      const stripePrice: Stripe.Price = await createStripeSubscriptionPlanPrice(
        {
          stripeProductId: stripeSubscriptionPlan.id,
          price: variant.price,
          intervalMonthCall: getIntervalMonthCall(variant.time),
        }
      );

      return {
        ...variant,
        stripePriceId: stripePrice.id,
      };
    })
  );

  if (!subscriptionPlanStripePrices) {
    return res.sendStatus(404);
  }

  //create subscriptionPlan
  const subscriptionPlan = await createSubscriptionPlan({
    ...body,
    stripeId: stripeSubscriptionPlan.id,
    variants: subscriptionPlanStripePrices,
  });

  if (!subscriptionPlan) {
    return res.sendStatus(404);
  }

  return res.send(subscriptionPlan);
}

export async function updateSubscriptionPlanController(
  req: Request<UpdateSubscriptionPlanInput['params']>,
  res: Response
) {
  const subscriptionPlanId = req.params.subscriptionPlanId;
  const update = req.body;

  const subscriptionPlan = await getSubscriptionPlan({
    _id: subscriptionPlanId,
  });

  if (!subscriptionPlan) {
    return res.sendStatus(404);
  }

  const updatedSubscriptionPlan = await getAndUpdateSubscriptionPlan(
    { _id: subscriptionPlanId },
    update,
    {
      new: true,
    }
  );

  return res.send(updatedSubscriptionPlan);
}

export async function getSubscriptionPlanController(
  req: Request<GetSubscriptionPlanInput['params']>,
  res: Response
) {
  const subscriptionPlanId = req.params.subscriptionPlanId;
  const subscriptionPlan = await getSubscriptionPlan({
    _id: subscriptionPlanId,
  });

  if (!subscriptionPlan) {
    return res.sendStatus(404);
  }

  return res.send(subscriptionPlan);
}

export async function getSubscriptionPlansController(
  req: Request,
  res: Response
) {
  const subscriptionPlans = await getSubscriptionPlans({});

  if (!subscriptionPlans) {
    return res.sendStatus(404);
  }

  return res.send(subscriptionPlans);
}

export async function deleteSubscriptionPlanController(
  req: Request<DeleteSubscriptionPlanInput['params']>,
  res: Response
) {
  const subscriptionPlanId = req.params.subscriptionPlanId;

  const subscriptionPlan = await getSubscriptionPlan({
    _id: subscriptionPlanId,
  });

  if (!subscriptionPlan) {
    return res.sendStatus(404);
  }

  //deleteStripeProduct
  await deleteStripeSubscriptionPlan(subscriptionPlan.stripeId);
  await deleteSubscriptionPlan({ _id: subscriptionPlanId });

  return res.sendStatus(200);
}
