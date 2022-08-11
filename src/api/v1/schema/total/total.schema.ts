import { object, number, string, TypeOf, z, array } from 'zod';

export const totalSchema = {
  total: object({
    kcal: number({
      required_error: 'Kcal is required',
      invalid_type_error: 'Kcal must be a number',
    }),
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
        // required_error: 'Vitamin A amount is required',
        invalid_type_error: 'Vitamin A must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']).optional(),
    }).optional(),
    vitaminB1: object({
      amount: number({
        // required_error: 'Viatamin B2 amount is required',
        invalid_type_error: 'Viatamin B1 must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']).optional(),
    }).optional(),
    vitaminB2: object({
      amount: number({
        // required_error: 'Viatamin B2 amount is required',
        invalid_type_error: 'Viatamin B2 must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']).optional(),
    }).optional(),
    vitaminB5: object({
      amount: number({
        // required_error: 'Viatamin B5 amount is required',
        invalid_type_error: 'Viatamin B5 must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']).optional(),
    }).optional(),
    vitaminB6: object({
      amount: number({
        // required_error: 'Viatamin B6 amount is required',
        invalid_type_error: 'Viatamin B6 must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']).optional(),
    }).optional(),
    vitaminB12: object({
      amount: number({
        // required_error: 'Viatamin B12 amount is required',
        invalid_type_error: 'Viatamin B12 must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']).optional(),
    }).optional(),
    biotin: object({
      amount: number({
        // required_error: 'Biotin amount is required',
        invalid_type_error: 'Biotin must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']).optional(),
    }).optional(),
    folicAcid: object({
      amount: number({
        // required_error: 'Folic acid amount is required',
        invalid_type_error: 'Folic acid must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']).optional(),
    }).optional(),
    vitaminC: object({
      amount: number({
        // required_error: 'Vitamin C amount is required',
        invalid_type_error: 'Vitamin C must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']).optional(),
    }).optional(),
    vitaminD: object({
      amount: number({
        // required_error: 'Vitamin D amount is required',
        invalid_type_error: 'Vitamin D must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']).optional(),
    }).optional(),
    vitaminE: object({
      amount: number({
        // required_error: 'Vitamin E amount is required',
        invalid_type_error: 'Vitamin E must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']).optional(),
    }).optional(),
    vitaminPP: object({
      amount: number({
        // required_error: 'Vitamin PP amount is required',
        invalid_type_error: 'Vitamin PP must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']).optional(),
    }).optional(),
    vitaminK: object({
      amount: number({
        // required_error: 'Vitamin K amount is required',
        invalid_type_error: 'Vitamin K must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']).optional(),
    }).optional(),

    //minerals
    zinc: object({
      amount: number({
        // required_error: 'Zinc amount is required',
        invalid_type_error: 'Zinc must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']).optional(),
    }).optional(),
    phosphorus: object({
      amount: number({
        // required_error: 'Phosphorus amount is required',
        invalid_type_error: 'Phosphorus must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']).optional(),
    }).optional(),
    magnesium: object({
      amount: number({
        // required_error: 'Magnesium amount is required',
        invalid_type_error: 'Magnesium must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']).optional(),
    }).optional(),
    copper: object({
      amount: number({
        // required_error: 'Copper amount is required',
        invalid_type_error: 'Copper must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']).optional(),
    }).optional(),
    potassium: object({
      amount: number({
        // required_error: 'Potassium amount is required',
        invalid_type_error: 'Potassium must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']).optional(),
    }).optional(),
    selenium: object({
      amount: number({
        // required_error: 'Selenium amount is required',
        invalid_type_error: 'Selenium must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']).optional(),
    }).optional(),

    sodium: object({
      amount: number({
        // required_error: 'Sodium amount is required',
        invalid_type_error: 'Sodium must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']).optional(),
    }).optional(),
    calcium: object({
      amount: number({
        // required_error: 'Calcium amount is required',
        invalid_type_error: 'Calcium must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']).optional(),
    }).optional(),
    iron: object({
      amount: number({
        // required_error: 'Iron amount is required',
        invalid_type_error: 'Iron must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']).optional(),
    }).optional(),
  }),
};
