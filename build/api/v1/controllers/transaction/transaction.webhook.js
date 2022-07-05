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
exports.createStripePaymentWebhook = void 0;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const stripeSecret = process.env.STRIPE_SECRET;
const stripe = require('stripe')(stripeSecret);
//transactionWebhook
function createStripePaymentWebhook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const stripeSignature = req.headers['stripe-signature'];
        if (!stripeSignature) {
            return res.sendStatus(404);
        }
        let event;
        try {
            event = stripe.webhooks.constructEvent(req.body, stripeSignature, stripeWebhookSecret);
        }
        catch (err) {
            res.status(400).send(`Webhook Error: ${err}`);
            return;
        }
        console.log(event);
        // // Handle the event
        // switch (event.type) {
        //   case 'checkout.session.completed':
        //     const session = event.data.object;
        //     // Then define and call a function to handle the event checkout.session.completed
        //     break;
        //   // ... handle other event types
        //   default:
        //     console.log(`Unhandled event type ${event.type}`);
        // }
        // Handle the event
        console.log(`Unhandled event type ${event.type}`);
        // Return a 200 response to acknowledge receipt of the event
        res.send(event.type);
        //   const body = req.body;
        //   //create transaction
        //   const subscriptionPlan = await createSubscriptionPlan({
        //     ...body,
        //     stripeId: stripeSubscriptionPlan.id,
        //     variants: subscriptionPlanStripePrices,
        //   });
        //   if (!subscriptionPlan) {
        //     return res.sendStatus(404);
        //   }
        //   return res.send(subscriptionPlan);
    });
}
exports.createStripePaymentWebhook = createStripePaymentWebhook;
