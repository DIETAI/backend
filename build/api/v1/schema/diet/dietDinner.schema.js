"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDietDinnersSchema = exports.getDietDinnerSchema = exports.deleteDietDinnerSchema = exports.updateDietDinnerSchema = exports.createDietDinnerSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        //basicInfo
        // name: string(),
        order: (0, zod_1.number)({
            required_error: 'Diet dinner order is required',
        }),
        dietId: (0, zod_1.string)({
            required_error: 'Diet Id is required',
        }),
        dayId: (0, zod_1.string)({
            required_error: 'Day Id is required',
        }),
        dietMealId: (0, zod_1.string)({
            required_error: 'DietMeal Id is required',
        }),
        dinnerId: (0, zod_1.string)({
            required_error: 'Day Id is required',
        }),
        products: (0, zod_1.array)((0, zod_1.object)({
            productId: (0, zod_1.string)({
                required_error: 'ProductId is required',
            }),
            selectedPortionGram: (0, zod_1.number)({
                required_error: 'Selected portion gram is required',
            }),
            total: (0, zod_1.object)({
                kcal: (0, zod_1.number)().optional(),
            }).optional(),
        })),
        total: (0, zod_1.object)({
            kcal: (0, zod_1.number)({
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
    params: (0, zod_1.object)({
        dietDinnerId: (0, zod_1.string)({
            required_error: 'dietDinnerId is required',
        }),
    }),
};
const dietMealParams = {
    params: (0, zod_1.object)({
        dietMealId: (0, zod_1.string)({
            required_error: 'dietMealId is required',
        }),
    }),
};
exports.createDietDinnerSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateDietDinnerSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.deleteDietDinnerSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getDietDinnerSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getDietDinnersSchema = (0, zod_1.object)(Object.assign({}, dietMealParams));
