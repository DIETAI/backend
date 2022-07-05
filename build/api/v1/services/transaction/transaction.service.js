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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransaction = exports.createStripeOrder = void 0;
const transaction_model_1 = __importDefault(require("../../models/transaction/transaction.model"));
const metrics_1 = require("../../utils/metrics");
const stripeSecret = process.env.STRIPE_SECRET;
const stripe = require('stripe')(stripeSecret);
function createStripeOrder(stripePriceId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const metricsLabels = {
            operation: 'createStripeOrder',
        };
        const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
        try {
            const result = yield stripe.checkout.sessions.create({
                client_reference_id: userId,
                success_url: 'http://localhost:3000/payment/success',
                cancel_url: 'http://localhost:3000/payment/cancel',
                payment_method_types: ['card'],
                line_items: [{ price: stripePriceId, quantity: 1 }],
                mode: 'subscription', //payment
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
exports.createStripeOrder = createStripeOrder;
function createTransaction(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const metricsLabels = {
            operation: 'createTransaction',
        };
        const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
        try {
            const result = yield transaction_model_1.default.create(input);
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'true' }));
            return result;
        }
        catch (e) {
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'false' }));
            throw e;
        }
    });
}
exports.createTransaction = createTransaction;
