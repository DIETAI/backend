"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDinnersSchema = exports.getDinnerSchema = exports.deleteDinnerSchema = exports.updateDinnerSchema = exports.createDinnerSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'Name is required',
        }),
        image: (0, zod_1.string)().optional(),
        gallery: (0, zod_1.array)((0, zod_1.string)()).optional(),
        mealTypes: (0, zod_1.array)(zod_1.z.enum(['breakfast', 'second_breakfast', 'lunch', 'snack', 'dinner'])),
        mealTypesKind: zod_1.z.enum(['mainCourse', 'soup', 'drink']),
        description: (0, zod_1.string)().optional(),
        recipe: (0, zod_1.string)().optional(),
        dietKindsExclude: (0, zod_1.array)((0, zod_1.string)()).optional(),
        tags: (0, zod_1.array)(zod_1.z.enum(['nogluten', 'lactose-free'])).optional(),
        preparation_time: zod_1.z.enum([
            '5m-less',
            '10m-less',
            '15m-less',
            '20m-less',
            '30m-less',
            '40m-less',
            '50m-less',
            '1h-less',
            '1.5h-less',
            '2h-less',
            '2.5h-less',
            '3h-less',
            '4h-less',
            '5h-less',
            '6h-less',
            '7h-less',
            '8h-less',
            '9h-less',
            '10h-less',
            '10h-more',
        ]),
    }),
};
const params = {
    params: (0, zod_1.object)({
        dinnerId: (0, zod_1.string)({
            required_error: 'dinnerId is required',
        }),
    }),
};
const query = {
    query: (0, zod_1.object)({
        page: (0, zod_1.string)().optional(),
        itemsCount: (0, zod_1.string)().optional(),
    }),
};
exports.createDinnerSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateDinnerSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.deleteDinnerSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getDinnerSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getDinnersSchema = (0, zod_1.object)(Object.assign({}, query));
