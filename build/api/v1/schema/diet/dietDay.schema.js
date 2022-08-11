"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDietDaysSchema = exports.getDietDaySchema = exports.deleteDietDaySchema = exports.updateDietDaySchema = exports.createDietDaySchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        //basicInfo
        name: (0, zod_1.string)().optional(),
        order: (0, zod_1.number)({
            required_error: 'Diet day order is required',
        }),
        dietId: (0, zod_1.string)({
            required_error: 'Diet Id is required',
        }),
        establishmentId: (0, zod_1.string)({
            required_error: 'Establishment Id is required',
        }),
        date: (0, zod_1.date)().optional(),
        total: (0, zod_1.object)({
            kcal: (0, zod_1.number)({
                required_error: 'Kcal is required',
                invalid_type_error: 'Kcal must be a number',
            }),
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
                    invalid_type_error: 'Protein procent procent must be a number',
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
        }),
    }),
};
const params = {
    params: (0, zod_1.object)({
        dietDayId: (0, zod_1.string)({
            required_error: 'dietDayId is required',
        }),
    }),
};
const dietParams = {
    params: (0, zod_1.object)({
        dietId: (0, zod_1.string)({
            required_error: 'dietId is required',
        }),
    }),
};
exports.createDietDaySchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateDietDaySchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.deleteDietDaySchema = (0, zod_1.object)(Object.assign({}, params));
exports.getDietDaySchema = (0, zod_1.object)(Object.assign({}, params));
exports.getDietDaysSchema = (0, zod_1.object)(Object.assign({}, dietParams));
