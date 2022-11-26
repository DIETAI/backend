"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const InvoiceSchema = new Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    companyName: { type: String, required: true },
    taxpayerIdentificationNumber: { type: String, required: true },
    zipCode: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    houseNumber: { type: String, required: true },
    apartmentNumber: { type: String },
}, {
    timestamps: true,
});
const InvoiceModel = mongoose_1.default.model('Invoice', InvoiceSchema);
exports.default = InvoiceModel;
