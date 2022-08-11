"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDietEstablishmentSchema = exports.deleteDietEstablishmentSchema = exports.updateDietEstablishmentSchema = exports.createDietEstablishmentSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        //basicInfo
        name: (0, zod_1.string)({
            required_error: 'Name is required',
        }),
        // client: string({
        //   required_error: 'Client is required',
        // }),
        folder: (0, zod_1.string)().optional(),
        description: (0, zod_1.string)().optional(),
        dietKind: (0, zod_1.string)().optional(),
        measurementId: (0, zod_1.string)().optional(),
        kcal: (0, zod_1.number)({
            required_error: 'Kcal is required',
            invalid_type_error: 'Meal time must be a number',
        }).positive(),
        //meals
        meals: (0, zod_1.object)({
            _id: (0, zod_1.string)({
                required_error: 'Meal _id is required',
                invalid_type_error: 'Meal _id must be a string',
            }),
            time: (0, zod_1.string)({
                required_error: 'Meal time is required',
                invalid_type_error: 'Meal time must be a string',
            }),
            name: (0, zod_1.string)({
                required_error: 'Meal name is required',
                invalid_type_error: 'Meal name must be a string',
            }),
            type: zod_1.z.enum([
                'breakfast',
                'second_breakfast',
                'lunch',
                'snack',
                'dinner',
            ]),
            procent: (0, zod_1.number)({
                required_error: 'Meal procent is required',
                invalid_type_error: 'Meal procent must be a number',
            }),
            kcal: (0, zod_1.number)({
                required_error: 'Meal kcal is required',
                invalid_type_error: 'Meal kcal must be a number',
            }),
        }).array(),
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
            procent: (0, zod_1.number)({
                required_error: 'Protein procent is required',
                invalid_type_error: 'Protein procent must be a number',
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
            procent: (0, zod_1.number)({
                required_error: 'Fat procent is required',
                invalid_type_error: 'Fat procent procent must be a number',
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
            procent: (0, zod_1.number)({
                required_error: 'Carbohydrates procent is required',
                invalid_type_error: 'Carbohydrates procent procent must be a number',
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
            procent: (0, zod_1.number)({
                required_error: 'Animal protein procent is required',
                invalid_type_error: 'Animal protein procent procent must be a number',
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
            procent: (0, zod_1.number)({
                required_error: 'Vegetable protein procent is required',
                invalid_type_error: 'Vegetable protein procent procent must be a number',
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
                required_error: 'Viatamin A amount is required',
                invalid_type_error: 'Viatamin A must be a number',
            }),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']),
        }).optional(),
        vitaminB2: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                required_error: 'Viatamin B2 amount is required',
                invalid_type_error: 'Viatamin B2 must be a number',
            }),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']),
        }).optional(),
        vitaminB5: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                required_error: 'Viatamin B5 amount is required',
                invalid_type_error: 'Viatamin B5 must be a number',
            }),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']),
        }).optional(),
        vitaminB6: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                required_error: 'Viatamin B6 amount is required',
                invalid_type_error: 'Viatamin B6 must be a number',
            }),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']),
        }).optional(),
        vitaminB12: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                required_error: 'Viatamin B12 amount is required',
                invalid_type_error: 'Viatamin B12 must be a number',
            }),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']),
        }).optional(),
        biotin: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                required_error: 'Biotin amount is required',
                invalid_type_error: 'Biotin must be a number',
            }),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']),
        }).optional(),
        folicAcid: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                required_error: 'Folic acid amount is required',
                invalid_type_error: 'Folic acid must be a number',
            }),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']),
        }).optional(),
        vitaminC: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                required_error: 'Vitamin C amount is required',
                invalid_type_error: 'Vitamin C must be a number',
            }),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']),
        }).optional(),
        vitaminD: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                required_error: 'Vitamin D amount is required',
                invalid_type_error: 'Vitamin D must be a number',
            }),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']),
        }).optional(),
        vitaminE: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                required_error: 'Vitamin E amount is required',
                invalid_type_error: 'Vitamin E must be a number',
            }),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']),
        }).optional(),
        vitaminPP: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                required_error: 'Vitamin PP amount is required',
                invalid_type_error: 'Vitamin PP must be a number',
            }),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']),
        }).optional(),
        vitaminK: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                required_error: 'Vitamin K amount is required',
                invalid_type_error: 'Vitamin K must be a number',
            }),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']),
        }).optional(),
        //minerals
        zinc: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                required_error: 'Zinc amount is required',
                invalid_type_error: 'Zinc must be a number',
            }),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']),
        }).optional(),
        phosphorus: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                required_error: 'Phosphorus amount is required',
                invalid_type_error: 'Phosphorus must be a number',
            }),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']),
        }).optional(),
        magnesium: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                required_error: 'Magnesium amount is required',
                invalid_type_error: 'Magnesium must be a number',
            }),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']),
        }).optional(),
        copper: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                required_error: 'Copper amount is required',
                invalid_type_error: 'Copper must be a number',
            }),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']),
        }).optional(),
        potassium: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                required_error: 'Potassium amount is required',
                invalid_type_error: 'Potassium must be a number',
            }),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']),
        }).optional(),
        selenium: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                required_error: 'Selenium amount is required',
                invalid_type_error: 'Selenium must be a number',
            }),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']),
        }).optional(),
        sodium: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                required_error: 'Sodium amount is required',
                invalid_type_error: 'Sodium must be a number',
            }),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']),
        }).optional(),
        calcium: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                required_error: 'Calcium amount is required',
                invalid_type_error: 'Calcium must be a number',
            }),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']),
        }).optional(),
        iron: (0, zod_1.object)({
            amount: (0, zod_1.number)({
                required_error: 'Iron amount is required',
                invalid_type_error: 'Iron must be a number',
            }),
            unit: zod_1.z.enum(['mg', 'uq', 'j.']),
        }).optional(),
    }),
};
const params = {
    params: (0, zod_1.object)({
        dietEstablishmentId: (0, zod_1.string)({
            required_error: 'dietEstablishmentId is required',
        }),
    }),
};
exports.createDietEstablishmentSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateDietEstablishmentSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.deleteDietEstablishmentSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getDietEstablishmentSchema = (0, zod_1.object)(Object.assign({}, params));
