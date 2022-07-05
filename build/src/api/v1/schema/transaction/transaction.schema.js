"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionSchema = exports.deleteTransactionSchema = exports.updateTransactionSchema = exports.createTransactionSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        subscriptionPlanId: (0, zod_1.string)({
            required_error: 'Subscription plan id is required',
        }),
        stripePriceId: (0, zod_1.string)({
            required_error: 'Stripe priceId is required',
        }),
        paymentOperator: zod_1.z.enum(['stripe', 'p24', 'paypal']),
    }),
};
const params = {
    params: (0, zod_1.object)({
        transactionId: (0, zod_1.string)({
            required_error: 'transactionId is required',
        }),
    }),
};
exports.createTransactionSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateTransactionSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.deleteTransactionSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getTransactionSchema = (0, zod_1.object)(Object.assign({}, params));
