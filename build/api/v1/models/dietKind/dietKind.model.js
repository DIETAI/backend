"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const DietKindSchema = new Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String },
}, {
    timestamps: true,
});
const DietKindModel = mongoose_1.default.model('DietKind', DietKindSchema);
exports.default = DietKindModel;
