import { object, number, string, TypeOf, z, array, date } from 'zod';

const payload = {
  body: object({
    //basicInfo
    name: string({
      required_error: 'Name is required',
    }),
    folder: string().optional(),
    clientId: string({
      required_error: 'Client is required',
    }),
    establishmentId: string({
      required_error: 'Establishment is required',
    }),
    days: array(
      object({
        order: number({ required_error: 'Wymagany indeks dnia' }),
        date: z
          .string()
          .transform((date) => new Date(date))
          .optional(),
      })
    ).min(1, 'Brak dni w diecie'),
    daysAmount: number().optional(),
    dayStart: z
      .string()
      .transform((date) => new Date(date))
      .optional(),
    dayEnd: z
      .string()
      .transform((date) => new Date(date))
      .optional(),
  }),
};

const params = {
  params: object({
    dietId: string({
      required_error: 'dietId is required',
    }),
  }),
};

export const createDietSchema = object({
  ...payload,
});

export const updateDietSchema = object({
  ...payload,
  ...params,
});

export const deleteDietSchema = object({
  ...params,
});

export const getDietSchema = object({
  ...params,
});

export type CreateDietInput = TypeOf<typeof createDietSchema>;
export type UpdateDietInput = TypeOf<typeof updateDietSchema>;
export type GetDietInput = TypeOf<typeof getDietSchema>;
export type DeleteDietInput = TypeOf<typeof deleteDietSchema>;
