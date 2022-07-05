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
exports.createStripeOrderSessionController = void 0;
const transaction_service_1 = require("../../services/transaction/transaction.service");
const subscriptionPlan_service_1 = require("../../services/subscriptionPlan/subscriptionPlan.service");
function createStripeOrderSessionController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const body = req.body;
        //getByProductId
        const subscriptionPlan = yield (0, subscriptionPlan_service_1.getSubscriptionPlan)({
            _id: body.subscriptionPlanId,
        });
        if (!subscriptionPlan) {
            return res.sendStatus(404);
        }
        //findVariantByStripePriceId
        const variant = subscriptionPlan.variants.find((variant) => variant.stripePriceId === body.stripePriceId);
        if (!variant) {
            return res.sendStatus(404);
        }
        //create transaction
        const stripeSession = yield (0, transaction_service_1.createStripeOrder)(variant.stripePriceId, userId);
        if (!stripeSession) {
            return res.sendStatus(404);
        }
        return res.send(stripeSession);
    });
}
exports.createStripeOrderSessionController = createStripeOrderSessionController;
