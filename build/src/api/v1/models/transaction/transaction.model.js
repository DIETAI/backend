"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const TransactionSchema = new Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'SubscriptionPlan',
        required: true,
    },
    subscriptionPlan: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    subscriptionPlanVariant: { type: String, required: true },
    valid: { type: Boolean, required: true, default: false },
    dateStart: { type: Date, required: true },
    dateEnd: { type: Date, required: true },
}, {
    timestamps: true,
});
const TransactionModel = mongoose_1.default.model('Transaction', TransactionSchema);
exports.default = TransactionModel;
