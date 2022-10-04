import { object, number, string, TypeOf, z, array, date } from 'zod';

const payload = {
  body: object({
    //basicInfo
    name: string({
      required_error: 'Name is required',
    }),
    type: z.enum(['healing', 'unconventional', 'other']),
    description: string().optional(),
  }),
};

const params = {
  params: object({
    dietKindId: string({
      required_error: 'dietKindId is required',
    }),
  }),
};

export const createDietKindSchema = object({
  ...payload,
});

export const updateDietKindSchema = object({
  ...payload,
  ...params,
});

export const deleteDietKindSchema = object({
  ...params,
});

export const getDietKindSchema = object({
  ...params,
});

export type CreateDietKindInput = TypeOf<typeof createDietKindSchema>;
export type UpdateDietKindInput = TypeOf<typeof updateDietKindSchema>;
export type GetDietKindInput = TypeOf<typeof getDietKindSchema>;
export type DeleteDietKindInput = TypeOf<typeof deleteDietKindSchema>;
