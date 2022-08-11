import { object, number, string, TypeOf, z, array, date } from 'zod';

const payload = {
  body: object({
    //basicInfo
    // name: string(),
    order: number({
      required_error: 'Diet dinner order is required',
    }),
    dietId: string({
      required_error: 'Diet Id is required',
    }),
    dayId: string({
      required_error: 'Day Id is required',
    }),
    dietMealId: string({
      required_error: 'DietMeal Id is required',
    }),
    dinnerPortionId: string({
      required_error: 'DinnerPortion Id is required',
    }),
    // dinnerId: string({
    //   required_error: 'Day Id is required',
    // }),
    // products: array(
    //   object({
    //     productId: string({
    //       required_error: 'ProductId is required',
    //     }),
    //     selectedPortionGram: number({
    //       required_error: 'Selected portion gram is required',
    //     }),
    //     total: object({
    //       kcal: number().optional(),
    //     }).optional(),
    //   })
    // ),
    // total: object({
    //   kcal: number({
    //     // required_error: 'Kcal is required',
    //     invalid_type_error: 'Kcal must be a number',
    //   }).optional(),
  }),
};

const params = {
  params: object({
    dietDinnerId: string({
      required_error: 'dietDinnerId is required',
    }),
  }),
};

const dietMealParams = {
  params: object({
    dietMealId: string({
      required_error: 'dietMealId is required',
    }),
  }),
};

const dinnerPortionParams = {
  params: object({
    dinnerPortionId: string({
      required_error: 'dinnerPortionId is required',
    }),
  }),
};

export const createDietDinnerSchema = object({
  ...payload,
});

export const updateDietDinnerSchema = object({
  ...payload,
  ...params,
});

export const deleteDietDinnerSchema = object({
  ...params,
});

export const getDietDinnerSchema = object({
  ...params,
});

export const getDietDinnersSchema = object({
  ...dietMealParams,
});

export const getDietDinnersByPortionSchema = object({
  ...dinnerPortionParams,
});

export type CreateDietDinnerInput = TypeOf<typeof createDietDinnerSchema>;
export type UpdateDietDinnerInput = TypeOf<typeof updateDietDinnerSchema>;
export type GetDietDinnerInput = TypeOf<typeof getDietDinnerSchema>;
export type GetDietDinnersInput = TypeOf<typeof getDietDinnersSchema>;
export type GetDietDinnersByPortionInput = TypeOf<
  typeof getDietDinnersByPortionSchema
>;
export type DeleteDietDinnerInput = TypeOf<typeof deleteDietDinnerSchema>;
