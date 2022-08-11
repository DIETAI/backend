"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubscriptionPlanSchema = exports.deleteSubscriptionPlanSchema = exports.updateSubscriptionPlanSchema = exports.createSubscriptionPlanSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        name: zod_1.z.enum(['test', 'standard', 'pro', 'vip']),
        role: zod_1.z.enum(['dietetic', 'admin', 'patient', 'personal']),
        // roles: array(z.enum(['dietetic', 'admin', 'patient', 'personal'])),
        image: (0, zod_1.string)(),
        shortDescription: (0, zod_1.string)().optional(),
        description: (0, zod_1.string)().optional(),
        price: (0, zod_1.number)({
            required_error: 'Price is required',
        }),
        salePrice: (0, zod_1.number)().optional(),
        features: (0, zod_1.array)((0, zod_1.object)({
            name: (0, zod_1.string)({ required_error: 'To pole jest wymagane' }),
        })).optional(),
        variants: (0, zod_1.array)((0, zod_1.object)({
            name: (0, zod_1.string)({
                required_error: 'Variant name is required',
            }),
            time: zod_1.z.enum(['1month', '3months', '6months']),
            price: (0, zod_1.number)({
                required_error: 'Variant price is required',
            }),
            salePrice: (0, zod_1.number)().optional(),
        })),
    }),
};
const params = {
    params: (0, zod_1.object)({
        subscriptionPlanId: (0, zod_1.string)({
            required_error: 'subscriptionPlanId is required',
        }),
    }),
};
exports.createSubscriptionPlanSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateSubscriptionPlanSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.deleteSubscriptionPlanSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getSubscriptionPlanSchema = (0, zod_1.object)(Object.assign({}, params));
