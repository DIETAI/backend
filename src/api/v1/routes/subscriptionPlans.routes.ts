import express from 'express';

//controllers
import {
  createSubscriptionPlanController,
  updateSubscriptionPlanController,
  deleteSubscriptionPlanController,
  getSubscriptionPlanController,
  getSubscriptionPlansController,
} from '../controllers/subscriptionPlan/subscriptionPlan.controller';

//schema
import {
  createSubscriptionPlanSchema,
  getSubscriptionPlanSchema,
  updateSubscriptionPlanSchema,
  deleteSubscriptionPlanSchema,
} from '../schema/subscriptionPlan/subscriptionPlan.schema';

//middleware
import requireUser from '../middleware/requireUser';
import validateSchema from '../middleware/schema.middleware';

const router = express.Router();

router.get(
  '/:subscriptionPlanId',
  [requireUser, validateSchema(getSubscriptionPlanSchema)],
  getSubscriptionPlanController
);

router.get('/', requireUser, getSubscriptionPlansController);

router.post(
  '/',
  [requireUser, validateSchema(createSubscriptionPlanSchema)],
  createSubscriptionPlanController
);

router.put(
  '/:subscriptionPlanId',
  [requireUser, validateSchema(updateSubscriptionPlanSchema)],
  updateSubscriptionPlanController
);

router.delete(
  '/:subscriptionPlanId',
  [requireUser, validateSchema(deleteSubscriptionPlanSchema)],
  deleteSubscriptionPlanController
);

export default router;
