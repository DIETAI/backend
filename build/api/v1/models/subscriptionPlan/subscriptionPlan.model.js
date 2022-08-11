"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const SubscriptionPlanSchema = new Schema({
    stripeId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    shortDescription: { type: String },
    description: { type: String },
    price: { type: Number, required: true },
    salePrice: { type: Number },
    image: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Asset',
        required: true,
    },
    features: [
        {
            name: { type: String, required: true },
        },
    ],
    variants: {
        required: true,
        type: [
            {
                stripePriceId: { type: String, required: true },
                name: { type: String, required: true },
                time: { type: String, required: true },
                price: { type: Number, required: true },
                salePrice: { type: Number },
            },
        ],
    },
}, {
    timestamps: true,
});
const SubscriptionPlanModel = mongoose_1.default.model('SubscriptionPlan', SubscriptionPlanSchema);
exports.default = SubscriptionPlanModel;
