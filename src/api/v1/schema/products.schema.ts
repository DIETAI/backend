import { object, number, string, TypeOf, z, literal, array } from 'zod';

const payload = {
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    kcal: number({
      required_error: 'Kcal is required',
      invalid_type_error: 'Kcal must be a number',
    }).positive(),
    image: string().optional(),
    gallery: array(string()).optional(),
    description: string().optional(),
    subGroupId: string().optional(),
    measureUnit: z.enum(['g', 'l']),
    season: z.enum(['zima', 'wiosna', 'lato', 'jesień']).optional(),
    dietKindsExclude: array(string()).optional(),
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
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
    vitaminB2: object({
      amount: number({
        // required_error: 'Viatamin B2 amount is required',
        invalid_type_error: 'Viatamin B2 must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
    vitaminB5: object({
      amount: number({
        // required_error: 'Viatamin B5 amount is required',
        invalid_type_error: 'Viatamin B5 must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
    vitaminB6: object({
      amount: number({
        // required_error: 'Viatamin B6 amount is required',
        invalid_type_error: 'Viatamin B6 must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
    vitaminB12: object({
      amount: number({
        // required_error: 'Viatamin B12 amount is required',
        invalid_type_error: 'Viatamin B12 must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
    biotin: object({
      amount: number({
        // required_error: 'Biotin amount is required',
        invalid_type_error: 'Biotin must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
    folicAcid: object({
      amount: number({
        // required_error: 'Folic acid amount is required',
        invalid_type_error: 'Folic acid must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
    vitaminC: object({
      amount: number({
        // required_error: 'Vitamin C amount is required',
        invalid_type_error: 'Vitamin C must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
    vitaminD: object({
      amount: number({
        // required_error: 'Vitamin D amount is required',
        invalid_type_error: 'Vitamin D must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
    vitaminE: object({
      amount: number({
        // required_error: 'Vitamin E amount is required',
        invalid_type_error: 'Vitamin E must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
    vitaminPP: object({
      amount: number({
        // required_error: 'Vitamin PP amount is required',
        invalid_type_error: 'Vitamin PP must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
    vitaminK: object({
      amount: number({
        // required_error: 'Vitamin K amount is required',
        invalid_type_error: 'Vitamin K must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),

    //minerals
    zinc: object({
      amount: number({
        // required_error: 'Zinc amount is required',
        invalid_type_error: 'Zinc must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
    phosphorus: object({
      amount: number({
        // required_error: 'Phosphorus amount is required',
        invalid_type_error: 'Phosphorus must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
    magnesium: object({
      amount: number({
        // required_error: 'Magnesium amount is required',
        invalid_type_error: 'Magnesium must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
    copper: object({
      amount: number({
        // required_error: 'Copper amount is required',
        invalid_type_error: 'Copper must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
    potassium: object({
      amount: number({
        // required_error: 'Potassium amount is required',
        invalid_type_error: 'Potassium must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
    selenium: object({
      amount: number({
        // required_error: 'Selenium amount is required',
        invalid_type_error: 'Selenium must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),

    sodium: object({
      amount: number({
        // required_error: 'Sodium amount is required',
        invalid_type_error: 'Sodium must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
    calcium: object({
      amount: number({
        // required_error: 'Calcium amount is required',
        invalid_type_error: 'Calcium must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),
    iron: object({
      amount: number({
        // required_error: 'Iron amount is required',
        invalid_type_error: 'Iron must be a number',
      }).optional(),
      unit: z.enum(['mg', 'uq', 'j.']),
    }).optional(),

    //measures
    measures: array(
      object({
        type: z.enum([
          'porcja',
          'sztuka',
          'szklanka',
          'łyżka',
          'łyżeczka',
          'garść',
          'opakowanie',
          'plaster',
          'ząbek',
          'kostka',
        ]),
        amount: number({
          required_error: 'Measure amount is required',
          invalid_type_error: 'Measure amount must be a number',
        }).positive(),
        unit: z.enum(['g', 'ml']),
      })
    ),

    //prices
    prices: array(
      object({
        shop: string({
          required_error: 'Shop is required',
          invalid_type_error: 'Shop must be string',
        }),
        price: number({
          required_error: 'Price is required',
          invalid_type_error: 'Price must be a number',
        }).positive(),
        currency: z.enum(['PLN', 'USD', 'EUR']),
      })
    ),
  }),
};

const params = {
  params: object({
    productId: string({
      required_error: 'productId is required',
    }),
  }),
};

export const createProductSchema = object({
  ...payload,
});

export const updateProductSchema = object({
  ...payload,
  ...params,
});

export const deleteProductSchema = object({
  ...params,
});

export const getProductSchema = object({
  ...params,
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type GetProductInput = TypeOf<typeof getProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
