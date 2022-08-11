"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDietDinnersByPortionSchema = exports.getDietDinnersSchema = exports.getDietDinnerSchema = exports.deleteDietDinnerSchema = exports.updateDietDinnerSchema = exports.createDietDinnerSchema = void 0;
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
        dinnerPortionId: (0, zod_1.string)({
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
const dinnerPortionParams = {
    params: (0, zod_1.object)({
        dinnerPortionId: (0, zod_1.string)({
            required_error: 'dinnerPortionId is required',
        }),
    }),
};
exports.createDietDinnerSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateDietDinnerSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.deleteDietDinnerSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getDietDinnerSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getDietDinnersSchema = (0, zod_1.object)(Object.assign({}, dietMealParams));
exports.getDietDinnersByPortionSchema = (0, zod_1.object)(Object.assign({}, dinnerPortionParams));
