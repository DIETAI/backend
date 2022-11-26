import { object, number, string, TypeOf, z, array, boolean } from 'zod';

const payload = {
  body: object({
    //basicInfo

    name: string({
      required_error: 'Name is required',
    }),
    client: string({
      required_error: 'Client is required',
    }),
    folder: string().optional(),
    description: string().optional(),
    dietKind: string().optional(),
    measurementId: string().optional(),
    clientMeasurementCpm: boolean(),
    kcal: number({
      required_error: 'Kcal is required',
      invalid_type_error: 'Meal time must be a number',
    }).positive(),
    //meals
    meals: object({
      _id: string({
        required_error: 'Meal _id is required',
        invalid_type_error: 'Meal _id must be a string',
      }),
      time: string({
        required_error: 'Meal time is required',
        invalid_type_error: 'Meal time must be a string',
      }),
      name: string({
        required_error: 'Meal name is required',
        invalid_type_error: 'Meal name must be a string',
      }),
      type: z.enum([
        'breakfast',
        'second_breakfast',
        'lunch',
        'snack',
        'dinner',
      ]),
      procent: number({
        required_error: 'Meal procent is required',
        invalid_type_error: 'Meal procent must be a number',
      }),
      kcal: number({
        required_error: 'Meal kcal is required',
        invalid_type_error: 'Meal kcal must be a number',
      }),
    }).array(),

    //macrohydrates
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
        invalid_type_error: 'Protein procent must be a number',
      }),
      min_procent: number({
        required_error: 'Min protein procent is required',
        invalid_type_error: 'Min protein procent must be a number',
      }),
      max_procent: number({
        required_error: 'Max protein procent is required',
        invalid_type_error: 'Max protein procent must be a number',
      }),
      min_gram: number({
        required_error: 'Min protein gram is required',
        invalid_type_error: 'Min protein gram must be a number',
      }),
      max_gram: number({
        required_error: 'Max protein gram is required',
        invalid_type_error: 'Max protein gram must be a number',
      }),
      min_kcal: number({
        required_error: 'Min protein kcal is required',
        invalid_type_error: 'Min protein kcal must be a number',
      }),
      max_kcal: number({
        required_error: 'Max protein kcal is required',
        invalid_type_error: 'Max protein kcal must be a number',
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
      min_procent: number({
        required_error: 'Min fat procent is required',
        invalid_type_error: 'Min fat procent must be a number',
      }),
      max_procent: number({
        required_error: 'Max fat procent is required',
        invalid_type_error: 'Max fat procent must be a number',
      }),
      min_gram: number({
        required_error: 'Min fat gram is required',
        invalid_type_error: 'Min fat gram must be a number',
      }),
      max_gram: number({
        required_error: 'Max fat gram is required',
        invalid_type_error: 'Max fat gram must be a number',
      }),
      min_kcal: number({
        required_error: 'Min fat kcal is required',
        invalid_type_error: 'Min fat kcal must be a number',
      }),
      max_kcal: number({
        required_error: 'Max fat kcal is required',
        invalid_type_error: 'Max fat kcal must be a number',
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
      min_procent: number({
        required_error: 'Min carbohydrates procent is required',
        invalid_type_error: 'Min carbohydrates procent must be a number',
      }),
      max_procent: number({
        required_error: 'Max carbohydrates procent is required',
        invalid_type_error: 'Max carbohydrates procent must be a number',
      }),
      min_gram: number({
        required_error: 'Min carbohydrates gram is required',
        invalid_type_error: 'Min carbohydrates gram must be a number',
      }),
      max_gram: number({
        required_error: 'Max carbohydrates gram is required',
        invalid_type_error: 'Max carbohydrates gram must be a number',
      }),
      min_kcal: number({
        required_error: 'Min carbohydrates kcal is required',
        invalid_type_error: 'Min carbohydrates kcal must be a number',
      }),
      max_kcal: number({
        required_error: 'Max carbohydrates kcal is required',
        invalid_type_error: 'Max carbohydrates kcal must be a number',
      }),
    }),
    digestableCarbohydrates: object({
      gram: number({
        required_error: 'Digestible carbohydrates gram is required',
        invalid_type_error: 'Digestible carbohydrates gram must be a number',
      }),
      kcal: number({
        required_error: 'Digestible carbohydrates kcal is required',
        invalid_type_error: 'Digestible carbohydrates kcal must be a number',
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
    animalProtein: object({
      gram: number({
        required_error: 'Animal protein gram is required',
        invalid_type_error: 'Animal protein gram must be a number',
      }),
      kcal: number({
        required_error: 'Animal protein kcal is required',
        invalid_type_error: 'Animal protein kcal must be a number',
      }),
      procent: number({
        required_error: 'Animal protein procent is required',
        invalid_type_error: 'Animal protein procent procent must be a number',
      }),
    }).optional(),
    vegetableProtein: object({
      gram: number({
        required_error: 'Vegetable protein gram is required',
        invalid_type_error: 'Vegetable protein gram must be a number',
      }),
      kcal: number({
        required_error: 'Vegetable protein kcal is required',
        invalid_type_error: 'Vegetable protein kcal must be a number',
      }),
      procent: number({
        required_error: 'Vegetable protein procent is required',
        invalid_type_error:
          'Vegetable protein procent procent must be a number',
      }),
    }).optional(),
    carbohydrateExchangers: number({
      required_error: 'Carbohydrate exchangers is required',
      invalid_type_error: 'Carbohydrate exchangers must be a number',
    }),
    proteinFatExchangers: number({
      required_error: 'Protein fat exchangers is required',
      invalid_type_error: 'Protein fat exchangers must be a number',
    }),

    //fattyAcids
    saturatedFattyAcids: number().optional(),
    pollyunsaturatedFattyAcids: number().optional(),
    pollyunsaturatedFattyAcidsOmega3: number().optional(),
    pollyunsaturatedFattyAcidsOmega6: number().optional(),
    monounsaturatedFattyAcids: number().optional(),

    //vitamins
    vitaminA: object({
      amount: number({
        required_error: 'Viatamin A amount is required',
        invalid_type_error: 'Viatamin A must be a number',
      }),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
    vitaminB2: object({
      amount: number({
        required_error: 'Viatamin B2 amount is required',
        invalid_type_error: 'Viatamin B2 must be a number',
      }),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
    vitaminB5: object({
      amount: number({
        required_error: 'Viatamin B5 amount is required',
        invalid_type_error: 'Viatamin B5 must be a number',
      }),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
    vitaminB6: object({
      amount: number({
        required_error: 'Viatamin B6 amount is required',
        invalid_type_error: 'Viatamin B6 must be a number',
      }),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
    vitaminB12: object({
      amount: number({
        required_error: 'Viatamin B12 amount is required',
        invalid_type_error: 'Viatamin B12 must be a number',
      }),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
    biotin: object({
      amount: number({
        required_error: 'Biotin amount is required',
        invalid_type_error: 'Biotin must be a number',
      }),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
    folicAcid: object({
      amount: number({
        required_error: 'Folic acid amount is required',
        invalid_type_error: 'Folic acid must be a number',
      }),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
    vitaminC: object({
      amount: number({
        required_error: 'Vitamin C amount is required',
        invalid_type_error: 'Vitamin C must be a number',
      }),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
    vitaminD: object({
      amount: number({
        required_error: 'Vitamin D amount is required',
        invalid_type_error: 'Vitamin D must be a number',
      }),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
    vitaminE: object({
      amount: number({
        required_error: 'Vitamin E amount is required',
        invalid_type_error: 'Vitamin E must be a number',
      }),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
    vitaminPP: object({
      amount: number({
        required_error: 'Vitamin PP amount is required',
        invalid_type_error: 'Vitamin PP must be a number',
      }),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
    vitaminK: object({
      amount: number({
        required_error: 'Vitamin K amount is required',
        invalid_type_error: 'Vitamin K must be a number',
      }),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),

    //minerals
    zinc: object({
      amount: number({
        required_error: 'Zinc amount is required',
        invalid_type_error: 'Zinc must be a number',
      }),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
    phosphorus: object({
      amount: number({
        required_error: 'Phosphorus amount is required',
        invalid_type_error: 'Phosphorus must be a number',
      }),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
    magnesium: object({
      amount: number({
        required_error: 'Magnesium amount is required',
        invalid_type_error: 'Magnesium must be a number',
      }),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
    copper: object({
      amount: number({
        required_error: 'Copper amount is required',
        invalid_type_error: 'Copper must be a number',
      }),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
    potassium: object({
      amount: number({
        required_error: 'Potassium amount is required',
        invalid_type_error: 'Potassium must be a number',
      }),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
    selenium: object({
      amount: number({
        required_error: 'Selenium amount is required',
        invalid_type_error: 'Selenium must be a number',
      }),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),

    sodium: object({
      amount: number({
        required_error: 'Sodium amount is required',
        invalid_type_error: 'Sodium must be a number',
      }),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
    calcium: object({
      amount: number({
        required_error: 'Calcium amount is required',
        invalid_type_error: 'Calcium must be a number',
      }),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
    iron: object({
      amount: number({
        required_error: 'Iron amount is required',
        invalid_type_error: 'Iron must be a number',
      }),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
  }),
};

const params = {
  params: object({
    dietEstablishmentId: string({
      required_error: 'dietEstablishmentId is required',
    }),
  }),
};

const query = {
  query: object({
    page: string().optional(),
    itemsCount: string().optional(),
  }),
};

export const createDietEstablishmentSchema = object({
  ...payload,
});

export const updateDietEstablishmentSchema = object({
  ...payload,
  ...params,
});

export const deleteDietEstablishmentSchema = object({
  ...params,
});

export const getDietEstablishmentSchema = object({
  ...params,
});

export const getDietEstablishmentsSchema = object({
  ...query,
});

export type CreateDietEstablishmentInput = TypeOf<
  typeof createDietEstablishmentSchema
>;
export type UpdateDietEstablishmentInput = TypeOf<
  typeof updateDietEstablishmentSchema
>;
export type GetDietEstablishmentInput = TypeOf<
  typeof getDietEstablishmentSchema
>;
export type GetDietEstablishmentsInput = TypeOf<
  typeof getDietEstablishmentsSchema
>;
export type DeleteDietEstablishmentInput = TypeOf<
  typeof deleteDietEstablishmentSchema
>;
