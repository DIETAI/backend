import { object, number, string, TypeOf, z, array, date } from 'zod';

const payload = {
  body: object({
    //basicInfo
    name: string(),
    type: z.enum(['breakfast', 'second_breakfast', 'lunch', 'snack', 'dinner']),
    order: number({
      required_error: 'Diet meal order is required',
    }),
    dietId: string({
      required_error: 'Diet Id is required',
    }),
    dayId: string({
      required_error: 'Day Id is required',
    }),
    establishmentMealId: string({
      required_error: 'Establishment meal Id is required',
    }),
    total: object({
      kcal: number({
        required_error: 'Kcal is required',
        invalid_type_error: 'Kcal must be a number',
      }),
      procent: number({
        required_error: 'Procent is required',
        invalid_type_error: 'Procent must be a number',
      }),
      protein: object({
        gram: number({
          required_error: 'Protein gram is required',
          invalid_type_error: 'Protein gram must be a number',
        }),
        kcal: number({
          required_error: 'Protein kcal is required',
          invalid_type_error: 'Protein kcal must be a number',
        }),
        procent: number({
          required_error: 'Protein procent is required',
          invalid_type_error: 'Protein procent procent must be a number',
        }),
      }),
      fat: object({
        gram: number({
          required_error: 'Fat gram is required',
          invalid_type_error: 'Fat gram must be a number',
        }),
        kcal: number({
          required_error: 'Fat kcal is required',
          invalid_type_error: 'Fat kcal must be a number',
        }),
        procent: number({
          required_error: 'Fat procent is required',
          invalid_type_error: 'Fat procent procent must be a number',
        }),
      }),
      carbohydrates: object({
        gram: number({
          required_error: 'Carbohydrates gram is required',
          invalid_type_error: 'Carbohydrates gram must be a number',
        }),
        kcal: number({
          required_error: 'Carbohydrates kcal is required',
          invalid_type_error: 'Carbohydrates kcal must be a number',
        }),
        procent: number({
          required_error: 'Carbohydrates procent is required',
          invalid_type_error: 'Carbohydrates procent procent must be a number',
        }),
      }),
      fiber: object({
        gram: number({
          required_error: 'Fiber gram is required',
          invalid_type_error: 'Fiber gram must be a number',
        }),
        kcal: number({
          required_error: 'Fiber kcal is required',
          invalid_type_error: 'Fiber kcal must be a number',
        }),
      }),
    }),
  }),
};

const params = {
  params: object({
    dietMealId: string({
      required_error: 'dietMealId is required',
    }),
  }),
};

const dietDayParams = {
  params: object({
    dietDayId: string({
      required_error: 'dietDayId is required',
    }),
  }),
};

export const createDietDayMealSchema = object({
  ...payload,
});

export const updateDietDayMealSchema = object({
  ...payload,
  ...params,
});

export const deleteDietDayMealSchema = object({
  ...params,
});

export const getDietDayMealSchema = object({
  ...params,
});

export const getDietDayMealsSchema = object({
  ...dietDayParams,
});

export type CreateDietDayMealInput = TypeOf<typeof createDietDayMealSchema>;
export type UpdateDietDayMealInput = TypeOf<typeof updateDietDayMealSchema>;
export type GetDietDayMealInput = TypeOf<typeof getDietDayMealSchema>;
export type GetDietDayMealsInput = TypeOf<typeof getDietDayMealsSchema>;
export type DeleteDietDayMealInput = TypeOf<typeof deleteDietDayMealSchema>;
