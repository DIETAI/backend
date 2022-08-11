import { object, number, string, TypeOf, z, array, date } from 'zod';

const payload = {
  body: object({
    //basicInfo
    name: string().optional(),
    order: number({
      required_error: 'Diet day order is required',
    }),
    dietId: string({
      required_error: 'Diet Id is required',
    }),
    establishmentId: string({
      required_error: 'Establishment Id is required',
    }),
    date: date().optional(),
    total: object({
      kcal: number({
        required_error: 'Kcal is required',
        invalid_type_error: 'Kcal must be a number',
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
    dietDayId: string({
      required_error: 'dietDayId is required',
    }),
  }),
};

const dietParams = {
  params: object({
    dietId: string({
      required_error: 'dietId is required',
    }),
  }),
};

export const createDietDaySchema = object({
  ...payload,
});

export const updateDietDaySchema = object({
  ...payload,
  ...params,
});

export const deleteDietDaySchema = object({
  ...params,
});

export const getDietDaySchema = object({
  ...params,
});

export const getDietDaysSchema = object({
  ...dietParams,
});

export type CreateDietDayInput = TypeOf<typeof createDietDaySchema>;
export type UpdateDietDayInput = TypeOf<typeof updateDietDaySchema>;
export type GetDietDayInput = TypeOf<typeof getDietDaySchema>;
export type GetDietDaysInput = TypeOf<typeof getDietDaysSchema>;
export type DeleteDietDayInput = TypeOf<typeof deleteDietDaySchema>;
