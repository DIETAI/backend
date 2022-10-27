import { object, number, string, TypeOf, z, array, date } from 'zod';

const payload = {
  body: object({
    //basicInfo
    mealId: string({ required_error: 'Meal id is required' }),
    mealGenerateOption: z.enum([
      'changeAmountAddedMealDinners',
      'newMeal',
    ]),
  }),
};

export const generateMealSchema = object({
  ...payload,
});

export type GenerateMealInput = TypeOf<typeof generateMealSchema>;
