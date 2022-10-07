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
    ),
    mealTypesKind: z.enum(['mainCourse', 'soup', 'drink']),
    description: string().optional(),
    recipe: string().optional(),
    dietKindsExclude: array(string()).optional(),
    tags: array(z.enum(['nogluten', 'lactose-free'])).optional(),
    preparation_time: z.enum([
      '5m-less',
      '10m-less',
      '15m-less',
      '20m-less',
      '30m-less',
      '40m-less',
      '50m-less',
      '1h-less',
      '1.5h-less',
      '2h-less',
      '2.5h-less',
      '3h-less',
      '4h-less',
      '5h-less',
      '6h-less',
      '7h-less',
      '8h-less',
      '9h-less',
      '10h-less',
      '10h-more',
    ]),
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
