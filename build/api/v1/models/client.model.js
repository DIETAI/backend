"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ClientSchema = new Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    physiologicalState: { type: String, required: true },
    email: { type: String },
    image: {
        type: mongoose_1.default.Schema.Types.String,
        ref: 'Asset',
    },
    onlineAccount: { type: Boolean },
    street: { type: String },
    zipCode: { type: String },
    city: { type: String },
    notes: { type: String },
    diseases: [{ type: String }],
    alergens: [{ type: String }],
    expectedBodyWeight: { type: Number },
    specificAims: [{ type: String }],
    likedProducts: [{ type: String }],
    dislikedProducts: [{ type: String }],
    pal: { type: Number },
}, {
    timestamps: true,
});
const ClientModel = mongoose_1.default.model('Client', ClientSchema);
exports.default = ClientModel;
