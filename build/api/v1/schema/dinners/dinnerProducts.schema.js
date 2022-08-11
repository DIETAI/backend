"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDinnerProductsSchema = exports.getDinnerProductSchema = exports.deleteDinnerProductSchema = exports.updateDinnerProductSchema = exports.createDinnerProductSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        order: (0, zod_1.number)({
            required_error: 'Dinner order is required',
        }),
        dinnerId: (0, zod_1.string)({
            required_error: 'Dinner Id is required',
        }),
        productId: (0, zod_1.string)({
            required_error: 'Product Id is required',
        }),
        defaultAmount: (0, zod_1.number)({
            required_error: 'Default amount is required',
        }),
        minAmount: (0, zod_1.number)().optional(),
        maxAmount: (0, zod_1.number)().optional(),
        portionsGram: (0, zod_1.array)((0, zod_1.number)({
            required_error: 'Portion gram is required',
        })),
    }),
};
const params = {
    params: (0, zod_1.object)({
        dinnerProductId: (0, zod_1.string)({
            required_error: 'dinnerProductId is required',
        }),
    }),
};
const dinnerParams = {
    params: (0, zod_1.object)({
        dinnerId: (0, zod_1.string)({
            required_error: 'dinnerId is required',
        }),
    }),
};
exports.createDinnerProductSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateDinnerProductSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.deleteDinnerProductSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getDinnerProductSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getDinnerProductsSchema = (0, zod_1.object)(Object.assign({}, dinnerParams));
