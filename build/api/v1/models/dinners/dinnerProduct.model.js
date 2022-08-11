"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const DinnerProductSchema = new Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    dinnerId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Dinner' },
    productId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Product' },
    defaultAmount: { type: Number, required: true },
    minAmount: { type: Number },
    maxAmount: { type: Number },
    portionsGram: { required: true, type: [{ type: Number, required: true }] },
}, {
    timestamps: true,
});
const DinnerProductModel = mongoose_1.default.model('DinnerProduct', DinnerProductSchema);
exports.default = DinnerProductModel;
