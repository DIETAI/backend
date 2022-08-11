"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStripeSubscriptionPlan = exports.createStripeSubscriptionPlanPrice = exports.createStripeSubscriptionPlan = void 0;
const stripeSecret = process.env.STRIPE_SECRET;
const stripe = require('stripe')(stripeSecret);
const metrics_1 = require("../../utils/metrics");
function createStripeSubscriptionPlan(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const metricsLabels = {
            operation: 'createStripeSubscriptionPlan',
        };
        const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
        try {
            const result = yield stripe.products.create({
                name: input.name,
                description: input.description,
                images: [input.imageURL],
                default_price_data: {
                    currency: 'pln',
                    unit_amount: input.defaultPrice * 100,
                },
            });
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'true' }));
            return result;
        }
        catch (e) {
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'false' }));
            throw e;
        }
    });
}
exports.createStripeSubscriptionPlan = createStripeSubscriptionPlan;
function createStripeSubscriptionPlanPrice({ stripeProductId, price, intervalMonthCall, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const metricsLabels = {
            operation: 'createStripeSubscriptionPlanPrice',
        };
        const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
        try {
            const result = yield stripe.prices.create({
                unit_amount: price * 100,
                currency: 'pln',
                recurring: { interval: 'month', interval_count: intervalMonthCall },
                product: stripeProductId,
            });
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'true' }));
            return result;
        }
        catch (e) {
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'false' }));
            throw e;
        }
    });
}
exports.createStripeSubscriptionPlanPrice = createStripeSubscriptionPlanPrice;
function deleteStripeSubscriptionPlan(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        const deleted = yield stripe.products.del(productId);
        return deleted;
    });
}
exports.deleteStripeSubscriptionPlan = deleteStripeSubscriptionPlan;
