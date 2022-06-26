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
    dinnerId: string({
      required_error: 'Day Id is required',
    }),
    products: array(
      object({
        productId: string({
          required_error: 'ProductId is required',
        }),
        selectedPortionGram: number({
          required_error: 'Selected portion gram is required',
        }),
        total: object({
          kcal: number().optional(),
        }).optional(),
      })
    ),
    total: object({
      kcal: number({
        // required_error: 'Kcal is required',
        invalid_type_error: 'Kcal must be a number',
      }).optional(),
      // protein: object({
      //   gram: number({
      //     required_error: 'Protein gram is required',
      //     invalid_type_error: 'Protein gram must be a number',
      //   }),
      //   kcal: number({
      //     required_error: 'Protein kcal is required',
      //     invalid_type_error: 'Protein kcal must be a number',
      //   }),
      //   procent: number({
      //     required_error: 'Protein procent is required',
      //     invalid_type_error: 'Protein procent procent must be a number',
      //   }),
      // }),
      // fat: object({
      //   gram: number({
      //     required_error: 'Fat gram is required',
      //     invalid_type_error: 'Fat gram must be a number',
      //   }),
      //   kcal: number({
      //     required_error: 'Fat kcal is required',
      //     invalid_type_error: 'Fat kcal must be a number',
      //   }),
      //   procent: number({
      //     required_error: 'Fat procent is required',
      //     invalid_type_error: 'Fat procent procent must be a number',
      //   }),
      // }),
      // carbohydrates: object({
      //   gram: number({
      //     required_error: 'Carbohydrates gram is required',
      //     invalid_type_error: 'Carbohydrates gram must be a number',
      //   }),
      //   kcal: number({
      //     required_error: 'Carbohydrates kcal is required',
      //     invalid_type_error: 'Carbohydrates kcal must be a number',
      //   }),
      //   procent: number({
      //     required_error: 'Carbohydrates procent is required',
      //     invalid_type_error: 'Carbohydrates procent procent must be a number',
      //   }),
      // }),
      // fiber: object({
      //   gram: number({
      //     required_error: 'Fiber gram is required',
      //     invalid_type_error: 'Fiber gram must be a number',
      //   }),
      //   kcal: number({
      //     required_error: 'Fiber kcal is required',
      //     invalid_type_error: 'Fiber kcal must be a number',
      //   }),
      // }),
    }).optional(),
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

export type CreateDietDinnerInput = TypeOf<typeof createDietDinnerSchema>;
export type UpdateDietDinnerInput = TypeOf<typeof updateDietDinnerSchema>;
export type GetDietDinnerInput = TypeOf<typeof getDietDinnerSchema>;
export type GetDietDinnersInput = TypeOf<typeof getDietDinnersSchema>;
export type DeleteDietDinnerInput = TypeOf<typeof deleteDietDinnerSchema>;
