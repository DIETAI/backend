import { object, number, string, TypeOf, z, array } from 'zod';

const payload = {
  body: object({
    order: number({
      required_error: 'Dinner order is required',
    }),
    dinnerId: string({
      required_error: 'Dinner Id is required',
    }),
    productId: string({
      required_error: 'Product Id is required',
    }),
    defaultAmount: number({
      required_error: 'Default amount is required',
    }),
    minAmount: number().optional(),
    maxAmount: number().optional(),
    portionsGram: array(
      number({
        required_error: 'Portion gram is required',
      })
    ),
  }),
};

const params = {
  params: object({
    dinnerProductId: string({
      required_error: 'dinnerProductId is required',
    }),
  }),
};

const dinnerParams = {
  params: object({
    dinnerId: string({
      required_error: 'dinnerId is required',
    }),
  }),
};

export const createDinnerProductSchema = object({
  ...payload,
});

export const updateDinnerProductSchema = object({
  ...payload,
  ...params,
});

export const deleteDinnerProductSchema = object({
  ...params,
});

export const getDinnerProductSchema = object({
  ...params,
});

export const getDinnerProductsSchema = object({
  ...dinnerParams,
});

export type CreateDinnerProductInput = TypeOf<typeof createDinnerProductSchema>;
export type UpdateDinnerProductInput = TypeOf<typeof updateDinnerProductSchema>;
export type GetDinnerProductInput = TypeOf<typeof getDinnerProductSchema>;
export type GetDinnerProductsInput = TypeOf<typeof getDinnerProductsSchema>;
export type DeleteDinnerProductInput = TypeOf<typeof deleteDinnerProductSchema>;
