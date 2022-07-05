"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const DietDinnerSchema = new Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    dietId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Diet',
        required: true,
    },
    dayId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'DietDay',
        required: true,
    },
    dietMealId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'DietMeal',
        required: true,
    },
    dinnerId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Dinner',
        required: true,
    },
    products: [
        {
            productId: { type: String, required: true },
            selectedPortionGram: { type: Number, required: true },
            total: {
                kcal: { type: Number },
            },
        },
    ],
    // name: { type: String, required: true },
    order: { type: Number, required: true },
    total: {
        kcal: { type: Number },
        // protein: {
        //   gram: { type: Number },
        //   kcal: { type: Number },
        //   procent: { type: Number },
        // },
        // fat: {
        //   gram: { type: Number },
        //   kcal: { type: Number },
        //   procent: { type: Number },
        // },
        // carbohydrates: {
        //   gram: { type: Number },
        //   kcal: { type: Number },
        //   procent: { type: Number },
        // },
        // fiber: {
        //   gram: { type: Number },
        //   kcal: { type: Number },
        // },
    },
}, {
    timestamps: true,
});
const DietDinnerModel = mongoose_1.default.model('DietDinner', DietDinnerSchema);
exports.default = DietDinnerModel;
