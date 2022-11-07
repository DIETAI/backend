import { object, number, string, TypeOf, z, array, date } from 'zod';

const payload = {
  body: object({
    title: string({
      required_error: 'Title is required',
    }),
    description: string().optional(),
    date: z.string().transform((date) => new Date(date)),
  }),
};

const params = {
  params: object({
    calendarId: string({
      required_error: 'calendarId is required',
    }),
  }),
};

export const createCalendarSchema = object({
  ...payload,
});

export const updateCalendarSchema = object({
  ...payload,
  ...params,
});

export const deleteCalendarSchema = object({
  ...params,
});

export const getCalendarSchema = object({
  ...params,
});

export type CreateCalendarInput = TypeOf<typeof createCalendarSchema>;
export type UpdateCalendarInput = TypeOf<typeof updateCalendarSchema>;
export type GetCalendarInput = TypeOf<typeof getCalendarSchema>;
export type DeleteCalendarInput = TypeOf<typeof deleteCalendarSchema>;
