"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsSchema = exports.getProductSchema = exports.deleteProductSchema = exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'Name is required',
        }),
        kcal: (0, zod_1.number)({
            required_error: 'Kcal is required',
            invalid_type_error: 'Kcal must be a number',
        }).positive(),
        image: (0, zod_1.string)().optional(),
        gallery: (0, zod_1.array)((0, zod_1.string)()).optional(),
        description: (0, zod_1.string)().optional(),
        subGroupId: (0, zod_1.string)().optional(),
        measureUnit: zod_1.z.enum(['g', 'l']),
        season: zod_1.z.enum(['zima', 'wiosna', 'lato', 'jesień']).optional(),
        dietKindsExclude: (0, zod_1.array)((0, zod_1.string)()).optional(),
        tags: (0, zod_1.array)((0, zod_1.string)()).optional(),
        //macrohydrates
        protein: (0, zod_1.object)({
            gram: (0, zod_1.number)({
                required_error: 'Protein gram is required',
                invalid_type_error: 'Protein gram must be a number',
            }),
            kcal: (0, zod_1.number)({
                required_error: 'Protein kcal is required',
                invalid_type_error: 'Protein kcal must be a number',
            }),
        }),
        fat: (0, zod_1.object)({
            gram: (0, zod_1.number)({
                required_error: 'Fat gram is required',
                invalid_type_error: 'Fat gram must be a number',
            }),
            kcal: (0, zod_1.number)({
                required_error: 'Fat kcal is required',
                invalid_type_error: 'Fat kcal must be a number',
            }),
        }),
        carbohydrates: (0, zod_1.object)({
            gram: (0, zod_1.number)({
                required_error: 'Carbohydrates gram is required',
                invalid_type_error: 'Carbohydrates gram must be a number',
            }),
            kcal: (0, zod_1.number)({
                required_error: 'Carbohydrates kcal is required',
                invalid_type_error: 'Carbohydrates kcal must be a number',
            }),
        }),
        digestableCarbohydrates: (0, zod_1.object)({
            gram: (0, zod_1.number)({
                required_error: 'Digestible carbohydrates gram is required',
                invalid_type_error: 'Digestible carbohydrates gram must be a number',
            }),
            kcal: (0, zod_1.number)({
                required_error: 'Digestible carbohydrates kcal is required',
                invalid_type_error: 'Digestible carbohydrates kcal must be a number',
            }),
        }),
        fiber: (0, zod_1.object)({
            gram: (0, zod_1.number)({
                required_error: 'Fiber gram is required',
                invalid_type_error: 'Fiber gram must be a number',
            }),
            kcal: (0, zod_1.number)({
                required_error: 'Fiber kcal is required',
                invalid_type_error: 'Fiber kcal must be a number',
            }),
        }),
        animalProtein: (0, zod_1.object)({
            gram: (0, zod_1.number)({
                required_error: 'Animal protein gram is required',
                invalid_type_error: 'Animal protein gram must be a number',
            }),
            kcal: (0, zod_1.number)({
                required_error: 'Animal protein kcal is required',
                invalid_type_error: 'Animal protein kcal must be a number',
            }),
        }).optional(),
        vegetableProtein: (0, zod_1.object)({
            gram: (0, zod_1.number)({
                required_error: 'Vegetable protein gram is required',
                invalid_type_error: 'Vegetable protein gram must be a number',
            }),
            kcal: (0, zod_1.number)({
                required_error: 'Vegetable protein kcal is required',
                invalid_type_error: 'Vegetable protein kcal must be a number',
            }),
        }).optional(),
        carbohydrateExchangers: (0, zod_1.number)({
            required_error: 'Carbohydrate exchangers is required',
            invalid_type_error: 'Carbohydrate exchangers must be a number',
        }),
        proteinFatExchangers: (0, zod_1.number)({
            required_error: 'Protein fat exchangers is required',
            invalid_type_error: 'Protein fat exchangers must be a number',
        }),
        //fattyAcids
        saturatedFattyAcids: (0, zod_1.number)().optional(),
        pollyunsaturatedFattyAcids: (0, zod_1.number)().optional(),
        pollyunsaturatedFattyAcidsOmega3: (0, zod_1.number)().optional(),
        pollyunsaturatedFattyAcidsOmega6: (0, zod_1.number)().optional(),
        monounsaturatedFattyAcids: (0, zod_1.number)().optional(),
        //vitamins
        vitaminA: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                // required_error: 'Vitamin A amount is required',
                invalid_type_error: 'Vitamin A must be a number',
            }).optional(),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']).optional(),
        }).optional(),
        vitaminB1: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                // required_error: 'Viatamin B2 amount is required',
                invalid_type_error: 'Viatamin B1 must be a number',
            }).optional(),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']).optional(),
        }).optional(),
        vitaminB2: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                // required_error: 'Viatamin B2 amount is required',
                invalid_type_error: 'Viatamin B2 must be a number',
            }).optional(),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']).optional(),
        }).optional(),
        vitaminB5: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                // required_error: 'Viatamin B5 amount is required',
                invalid_type_error: 'Viatamin B5 must be a number',
            }).optional(),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']).optional(),
        }).optional(),
        vitaminB6: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                // required_error: 'Viatamin B6 amount is required',
                invalid_type_error: 'Viatamin B6 must be a number',
            }).optional(),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']).optional(),
        }).optional(),
        vitaminB12: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                // required_error: 'Viatamin B12 amount is required',
                invalid_type_error: 'Viatamin B12 must be a number',
            }).optional(),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']).optional(),
        }).optional(),
        biotin: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                // required_error: 'Biotin amount is required',
                invalid_type_error: 'Biotin must be a number',
            }).optional(),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']).optional(),
        }).optional(),
        folicAcid: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                // required_error: 'Folic acid amount is required',
                invalid_type_error: 'Folic acid must be a number',
            }).optional(),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']).optional(),
        }).optional(),
        vitaminC: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                // required_error: 'Vitamin C amount is required',
                invalid_type_error: 'Vitamin C must be a number',
            }).optional(),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']).optional(),
        }).optional(),
        vitaminD: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                // required_error: 'Vitamin D amount is required',
                invalid_type_error: 'Vitamin D must be a number',
            }).optional(),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']).optional(),
        }).optional(),
        vitaminE: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                // required_error: 'Vitamin E amount is required',
                invalid_type_error: 'Vitamin E must be a number',
            }).optional(),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']).optional(),
        }).optional(),
        vitaminPP: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                // required_error: 'Vitamin PP amount is required',
                invalid_type_error: 'Vitamin PP must be a number',
            }).optional(),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']).optional(),
        }).optional(),
        vitaminK: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                // required_error: 'Vitamin K amount is required',
                invalid_type_error: 'Vitamin K must be a number',
            }).optional(),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']).optional(),
        }).optional(),
        //minerals
        zinc: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                // required_error: 'Zinc amount is required',
                invalid_type_error: 'Zinc must be a number',
            }).optional(),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']).optional(),
        }).optional(),
        phosphorus: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                // required_error: 'Phosphorus amount is required',
                invalid_type_error: 'Phosphorus must be a number',
            }).optional(),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']).optional(),
        }).optional(),
        magnesium: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                // required_error: 'Magnesium amount is required',
                invalid_type_error: 'Magnesium must be a number',
            }).optional(),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']).optional(),
        }).optional(),
        copper: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                // required_error: 'Copper amount is required',
                invalid_type_error: 'Copper must be a number',
            }).optional(),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']).optional(),
        }).optional(),
        potassium: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                // required_error: 'Potassium amount is required',
                invalid_type_error: 'Potassium must be a number',
            }).optional(),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']).optional(),
        }).optional(),
        selenium: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                // required_error: 'Selenium amount is required',
                invalid_type_error: 'Selenium must be a number',
            }).optional(),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']).optional(),
        }).optional(),
        sodium: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                // required_error: 'Sodium amount is required',
                invalid_type_error: 'Sodium must be a number',
            }).optional(),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']).optional(),
        }).optional(),
        calcium: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                // required_error: 'Calcium amount is required',
                invalid_type_error: 'Calcium must be a number',
            }).optional(),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']).optional(),
        }).optional(),
        iron: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                // required_error: 'Iron amount is required',
                invalid_type_error: 'Iron must be a number',
            }).optional(),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']).optional(),
        }).optional(),
        //measures
        measures: (0, zod_1.array)((0, zod_1.object)({
            type: zod_1.z.enum([
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
            amount: (0, zod_1.number)({
                required_error: 'Measure amount is required',
                invalid_type_error: 'Measure amount must be a number',
            }).positive(),
            unit: zod_1.z.enum(['g', 'ml']),
        })),
        //prices
        prices: (0, zod_1.array)((0, zod_1.object)({
            shop: (0, zod_1.string)({
                required_error: 'Shop is required',
                invalid_type_error: 'Shop must be string',
            }),
            price: (0, zod_1.number)({
                required_error: 'Price is required',
                invalid_type_error: 'Price must be a number',
            }).positive(),
            currency: zod_1.z.enum(['PLN', 'USD', 'EUR']),
        })),
    }),
};
const params = {
    params: (0, zod_1.object)({
        productId: (0, zod_1.string)({
            required_error: 'productId is required',
        }),
    }),
};
const query = {
    query: (0, zod_1.object)({
        page: (0, zod_1.string)().optional(),
        itemsCount: (0, zod_1.string)().optional(),
    }),
};
exports.createProductSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateProductSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.deleteProductSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getProductSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getProductsSchema = (0, zod_1.object)(Object.assign({}, query));
