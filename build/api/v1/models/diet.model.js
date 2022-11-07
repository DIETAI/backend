"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const DietSchema = new Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    daysAmount: { type: Number },
    dayStart: { type: Date },
    dayEnd: { type: Date },
    folder: { type: String },
    clientId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Client',
    },
    establishmentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'DietEstablishment',
    },
}, {
    timestamps: true,
});
const DietModel = mongoose_1.default.model('Diet', DietSchema);
exports.default = DietModel;
