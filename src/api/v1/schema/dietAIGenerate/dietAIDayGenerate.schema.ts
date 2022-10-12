import { object, number, string, TypeOf, z, array, date } from 'zod';

const payload = {
  body: object({
    currentDayId: string({ required_error: 'Meal id is required' }),
    mealsToGenerate: array(
      object({
        uid: string({ required_error: 'Meal uid is required' }),
        type: z.enum([
          'breakfast',
          'second_breakfast',
          'lunch',
          'snack',
          'dinner',
        ]),
      })
    ),
    generateMealsSettings: z.enum([
      'changeAmountAddedMeals',
      'saveAddedMeals',
      'newMeals',
    ]),
  }),
};

export const generateDaySchema = object({
  ...payload,
});

export type GenerateDayInput = TypeOf<typeof generateDaySchema>;
