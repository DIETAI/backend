import { Request, Response } from 'express';
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

export async function createSubscriptionPlanController(
  req: Request<{}, {}, CreateSubscriptionPlanInput['body']>,
  res: Response
) {
  const body = req.body;

  const subscriptionPlan = await createSubscriptionPlan({
    ...body,
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

  await deleteSubscriptionPlan({ _id: subscriptionPlanId });

  return res.sendStatus(200);
}
