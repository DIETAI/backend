import { object, number, string, TypeOf, z, array } from 'zod';

const payload = {
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    image: string().optional(),
    gallery: array(string()).optional(),
    mealTypes: array(
      z.enum(['breakfast', 'second_breakfast', 'lunch', 'snack', 'dinner'])
    ).optional(),
    mealTypesKind: z.enum(['mainCourse', 'soup', 'drink']).optional(),
    description: string().optional(),
    recipe: string().optional(),
    dietKinds: array(string()).optional(),
    tags: array(string()).optional(),
    preparation_time: string().optional(),
    products: array(
      object({
        productId: string(),
        defaultAmount: number(),
        minAmount: number().optional(),
        maxAmount: number().optional(),
        portionsGram: array(number()).optional(),
      })
    ),
  }),
};

const params = {
  params: object({
    dinnerId: string({
      required_error: 'dinnerId is required',
    }),
  }),
};

export const createDinnerSchema = object({
  ...payload,
});

export const updateDinnerSchema = object({
  ...payload,
  ...params,
});

export const deleteDinnerSchema = object({
  ...params,
});

export const getDinnerSchema = object({
  ...params,
});

export type CreateDinnerInput = TypeOf<typeof createDinnerSchema>;
export type UpdateDinnerInput = TypeOf<typeof updateDinnerSchema>;
export type GetDinnerInput = TypeOf<typeof getDinnerSchema>;
export type DeleteDinnerInput = TypeOf<typeof deleteDinnerSchema>;
