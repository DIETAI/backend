import { object, number, string, TypeOf, z, array, date } from 'zod';

const payload = {
  body: object({
    name: z.enum(['test', 'standard', 'pro', 'vip']),
    roles: array(z.enum(['dietetic', 'admin', 'patient', 'personal'])),
    image: string(),
    shortDescription: string().optional(),
    description: string().optional(),
    price: number({
      required_error: 'Price is required',
    }),
    salePrice: number().optional(),
    features: array(
      object({
        name: string({ required_error: 'To pole jest wymagane' }),
      })
    ).optional(),
  }),
};

const params = {
  params: object({
    subscriptionPlanId: string({
      required_error: 'subscriptionPlanId is required',
    }),
  }),
};

export const createSubscriptionPlanSchema = object({
  ...payload,
});

export const updateSubscriptionPlanSchema = object({
  ...payload,
  ...params,
});

export const deleteSubscriptionPlanSchema = object({
  ...params,
});

export const getSubscriptionPlanSchema = object({
  ...params,
});

export type CreateSubscriptionPlanInput = TypeOf<
  typeof createSubscriptionPlanSchema
>;
export type UpdateSubscriptionPlanInput = TypeOf<
  typeof updateSubscriptionPlanSchema
>;
export type GetSubscriptionPlanInput = TypeOf<typeof getSubscriptionPlanSchema>;
export type DeleteSubscriptionPlanInput = TypeOf<
  typeof deleteSubscriptionPlanSchema
>;
