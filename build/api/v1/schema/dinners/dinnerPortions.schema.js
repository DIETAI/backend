"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDinnerPortionsSchema = exports.getDinnerPortionSchema = exports.deleteDinnerPortionSchema = exports.updateDinnerPortionSchema = exports.createDinnerPortionSchema = void 0;
const zod_1 = require("zod");
const total_schema_1 = require("../total/total.schema");
const payload = {
    body: (0, zod_1.object)(Object.assign(Object.assign({}, total_schema_1.totalSchema), { dinnerId: (0, zod_1.string)({
            required_error: 'Dinner Id is required',
        }), 
        // total: object({
        //   kcal: number().optional(),
        // }),
        type: zod_1.z.enum(['default', 'custom']), dinnerProducts: (0, zod_1.array)((0, zod_1.object)(Object.assign(Object.assign({}, total_schema_1.totalSchema), { dinnerProductId: (0, zod_1.string)({
                required_error: 'DinnerProduct Id is required',
            }), portion: (0, zod_1.number)({ required_error: 'Portion is required' }) }))) })),
};
const params = {
    params: (0, zod_1.object)({
        dinnerPortionId: (0, zod_1.string)({
            required_error: 'dinnerPortionId is required',
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
exports.createDinnerPortionSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateDinnerPortionSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.deleteDinnerPortionSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getDinnerPortionSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getDinnerPortionsSchema = (0, zod_1.object)(Object.assign({}, dinnerParams));
