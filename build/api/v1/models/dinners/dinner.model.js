"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const DinnerSchema = new Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    image: { type: String },
    gallery: [{ type: String }],
    mealTypes: [{ type: String, required: true }],
    mealTypesKind: { type: String, required: true },
    description: { type: String },
    recipe: { type: String },
    preparation_time: { type: String },
    dietKinds: [{ type: String }],
    tags: [{ type: String }],
}, {
    timestamps: true,
});
const DinnerModel = mongoose_1.default.model('Dinner', DinnerSchema);
exports.default = DinnerModel;
