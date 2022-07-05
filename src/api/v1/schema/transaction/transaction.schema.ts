import { object, number, string, TypeOf, z, array, date } from 'zod';

const payload = {
  body: object({
    subscriptionPlanId: string({
      required_error: 'Subscription plan id is required',
    }),
    stripePriceId: string({
      required_error: 'Stripe priceId is required',
    }),
    paymentOperator: z.enum(['stripe', 'p24', 'paypal']),
  }),
};

const params = {
  params: object({
    transactionId: string({
      required_error: 'transactionId is required',
    }),
  }),
};

export const createTransactionSchema = object({
  ...payload,
});

export const updateTransactionSchema = object({
  ...payload,
  ...params,
});

export const deleteTransactionSchema = object({
  ...params,
});

export const getTransactionSchema = object({
  ...params,
});

export type CreateTransactionInput = TypeOf<typeof createTransactionSchema>;
export type UpdateTransactionInput = TypeOf<typeof updateTransactionSchema>;
export type GetTransactionInput = TypeOf<typeof getTransactionSchema>;
export type DeleteTransactionInput = TypeOf<typeof deleteTransactionSchema>;
