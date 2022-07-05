"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const DietMealSchema = new Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    establishmentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'DietEstablishment',
    },
    dietId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Diet',
    },
    dayId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'DietDay',
    },
    name: { type: String, required: true },
    type: { type: String, required: true },
    order: { type: Number, required: true },
    total: {
        kcal: { type: Number },
        procent: { type: Number },
        protein: {
            gram: { type: Number },
            kcal: { type: Number },
            procent: { type: Number },
        },
        fat: {
            gram: { type: Number },
            kcal: { type: Number },
            procent: { type: Number },
        },
        carbohydrates: {
            gram: { type: Number },
            kcal: { type: Number },
            procent: { type: Number },
        },
        fiber: {
            gram: { type: Number },
            kcal: { type: Number },
        },
    },
}, {
    timestamps: true,
});
const DietMealModel = mongoose_1.default.model('DietMeal', DietMealSchema);
exports.default = DietMealModel;
