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
exports.deleteSubscriptionPlanController = exports.getSubscriptionPlansController = exports.getSubscriptionPlanController = exports.updateSubscriptionPlanController = exports.createSubscriptionPlanController = void 0;
const subscriptionPlan_service_1 = require("../../services/subscriptionPlan/subscriptionPlan.service");
const asset_service_1 = require("../../services/asset.service");
const stripe_service_1 = require("../../services/subscriptionPlan/stripe.service");
function createSubscriptionPlanController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        //getAsset
        const asset = yield (0, asset_service_1.getAsset)({ _id: body.image });
        if (!asset) {
            return res.sendStatus(404);
        }
        //create stripeSubscriptionPlan
        const imageURL = asset.imageURL;
        const stripeSubscriptionPlan = yield (0, stripe_service_1.createStripeSubscriptionPlan)({
            name: body.name,
            description: body.description || undefined,
            defaultPrice: body.price,
            imageURL,
        });
        if (!stripeSubscriptionPlan) {
            return res.sendStatus(404);
        }
        //create stripeSubscriptionPlanPrices
        const subscriptionPlanVariants = body.variants;
        const getIntervalMonthCall = (time) => {
            if (time === '1month') {
                return 1;
            }
            if (time === '3months') {
                return 3;
            }
            return 6;
        };
        const subscriptionPlanStripePrices = yield Promise.all(subscriptionPlanVariants.map((variant) => __awaiter(this, void 0, void 0, function* () {
            const stripePrice = yield (0, stripe_service_1.createStripeSubscriptionPlanPrice)({
                stripeProductId: stripeSubscriptionPlan.id,
                price: variant.price,
                intervalMonthCall: getIntervalMonthCall(variant.time),
            });
            return Object.assign(Object.assign({}, variant), { stripePriceId: stripePrice.id });
        })));
        if (!subscriptionPlanStripePrices) {
            return res.sendStatus(404);
        }
        //create subscriptionPlan
        const subscriptionPlan = yield (0, subscriptionPlan_service_1.createSubscriptionPlan)(Object.assign(Object.assign({}, body), { stripeId: stripeSubscriptionPlan.id, variants: subscriptionPlanStripePrices }));
        if (!subscriptionPlan) {
            return res.sendStatus(404);
        }
        return res.send(subscriptionPlan);
    });
}
exports.createSubscriptionPlanController = createSubscriptionPlanController;
function updateSubscriptionPlanController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const subscriptionPlanId = req.params.subscriptionPlanId;
        const update = req.body;
        const subscriptionPlan = yield (0, subscriptionPlan_service_1.getSubscriptionPlan)({
            _id: subscriptionPlanId,
        });
        if (!subscriptionPlan) {
            return res.sendStatus(404);
        }
        const updatedSubscriptionPlan = yield (0, subscriptionPlan_service_1.getAndUpdateSubscriptionPlan)({ _id: subscriptionPlanId }, update, {
            new: true,
        });
        return res.send(updatedSubscriptionPlan);
    });
}
exports.updateSubscriptionPlanController = updateSubscriptionPlanController;
function getSubscriptionPlanController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const subscriptionPlanId = req.params.subscriptionPlanId;
        const subscriptionPlan = yield (0, subscriptionPlan_service_1.getSubscriptionPlan)({
            _id: subscriptionPlanId,
        });
        if (!subscriptionPlan) {
            return res.sendStatus(404);
        }
        return res.send(subscriptionPlan);
    });
}
exports.getSubscriptionPlanController = getSubscriptionPlanController;
function getSubscriptionPlansController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const subscriptionPlans = yield (0, subscriptionPlan_service_1.getSubscriptionPlans)({});
        if (!subscriptionPlans) {
            return res.sendStatus(404);
        }
        return res.send(subscriptionPlans);
    });
}
exports.getSubscriptionPlansController = getSubscriptionPlansController;
function deleteSubscriptionPlanController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const subscriptionPlanId = req.params.subscriptionPlanId;
        const subscriptionPlan = yield (0, subscriptionPlan_service_1.getSubscriptionPlan)({
            _id: subscriptionPlanId,
        });
        if (!subscriptionPlan) {
            return res.sendStatus(404);
        }
        //deleteStripeProduct
        yield (0, stripe_service_1.deleteStripeSubscriptionPlan)(subscriptionPlan.stripeId);
        yield (0, subscriptionPlan_service_1.deleteSubscriptionPlan)({ _id: subscriptionPlanId });
        return res.sendStatus(200);
    });
}
exports.deleteSubscriptionPlanController = deleteSubscriptionPlanController;
