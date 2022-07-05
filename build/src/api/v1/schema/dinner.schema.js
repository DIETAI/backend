"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDinnerSchema = exports.deleteDinnerSchema = exports.updateDinnerSchema = exports.createDinnerSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'Name is required',
        }),
        image: (0, zod_1.string)().optional(),
        gallery: (0, zod_1.array)((0, zod_1.string)()).optional(),
        mealTypes: (0, zod_1.array)(zod_1.z.enum(['breakfast', 'second_breakfast', 'lunch', 'snack', 'dinner'])).optional(),
        mealTypesKind: zod_1.z.enum(['mainCourse', 'soup', 'drink']).optional(),
        description: (0, zod_1.string)().optional(),
        recipe: (0, zod_1.string)().optional(),
        dietKinds: (0, zod_1.array)((0, zod_1.string)()).optional(),
        tags: (0, zod_1.array)((0, zod_1.string)()).optional(),
        preparation_time: (0, zod_1.string)().optional(),
        products: (0, zod_1.array)((0, zod_1.object)({
            productId: (0, zod_1.string)(),
            defaultAmount: (0, zod_1.number)(),
            minAmount: (0, zod_1.number)().optional(),
            maxAmount: (0, zod_1.number)().optional(),
            portionsGram: (0, zod_1.array)((0, zod_1.number)()).optional(),
        })),
    }),
};
const params = {
    params: (0, zod_1.object)({
        dinnerId: (0, zod_1.string)({
            required_error: 'dinnerId is required',
        }),
    }),
};
exports.createDinnerSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateDinnerSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.deleteDinnerSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getDinnerSchema = (0, zod_1.object)(Object.assign({}, params));
