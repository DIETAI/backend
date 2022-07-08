import { object, number, string, TypeOf, z, array } from 'zod';

const payload = {
  body: object({
    dinnerId: string({
      required_error: 'Dinner Id is required',
    }),
    total: object({
      kcal: number().optional(),
    }),
    type: z.enum(['default', 'custom']),
    dinnerProducts: array(
      object({
        dinnerProductId: string({
          required_error: 'DinnerProduct Id is required',
        }),
        portion: number({ required_error: 'Portion is required' }),
        total: object({
          kcal: number().optional(),
        }),
      })
    ),
  }),
};

const params = {
  params: object({
    dinnerPortionId: string({
      required_error: 'dinnerPortionId is required',
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

export const createDinnerPortionSchema = object({
  ...payload,
});

export const updateDinnerPortionSchema = object({
  ...payload,
  ...params,
});

export const deleteDinnerPortionSchema = object({
  ...params,
});

export const getDinnerPortionSchema = object({
  ...params,
});

export const getDinnerPortionsSchema = object({
  ...dinnerParams,
});

export type CreateDinnerPortionInput = TypeOf<typeof createDinnerPortionSchema>;
export type UpdateDinnerPortionInput = TypeOf<typeof updateDinnerPortionSchema>;
export type GetDinnerPortionInput = TypeOf<typeof getDinnerPortionSchema>;
export type GetDinnerPortionsInput = TypeOf<typeof getDinnerPortionsSchema>;
export type DeleteDinnerPortionInput = TypeOf<typeof deleteDinnerPortionSchema>;
