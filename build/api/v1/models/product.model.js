"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ProductSchema = new Schema({
    user: {
        type: mongoose_1.default.Schema.Types.String,
        ref: 'User',
        required: true,
    },
    name: { type: String, required: true },
    kcal: { type: Number, required: true },
    image: {
        type: mongoose_1.default.Schema.Types.String,
        ref: 'Asset',
    },
    gallery: [
        { type: mongoose_1.default.Schema.Types.String, ref: 'Asset', required: true },
    ],
    description: { type: String },
    subGroupId: { type: String },
    season: { type: String },
    dietKindsExclude: [{ type: mongoose_1.default.Schema.Types.String, ref: 'DietKind' }],
    tags: [{ type: String }],
    measureUnit: { type: String, required: true },
    //macrohydrates
    protein: {
        gram: { type: Number, required: true },
        kcal: { type: Number, required: true },
    },
    fat: {
        gram: { type: Number, required: true },
        kcal: { type: Number, required: true },
    },
    carbohydrates: {
        gram: { type: Number, required: true },
        kcal: { type: Number, required: true },
    },
    digestableCarbohydrates: {
        gram: { type: Number, required: true },
        kcal: { type: Number, required: true },
    },
    fiber: {
        gram: { type: Number, required: true },
        kcal: { type: Number, required: true },
    },
    animalProtein: {
        gram: { type: Number },
        kcal: { type: Number },
    },
    vegetableProtein: {
        gram: { type: Number },
        kcal: { type: Number },
    },
    carbohydrateExchangers: { type: Number, required: true },
    proteinFatExchangers: { type: Number, required: true },
    //fatty acids
    saturatedFattyAcids: { type: Number },
    pollyunsaturatedFattyAcids: { type: Number },
    pollyunsaturatedFattyAcidsOmega3: { type: Number },
    pollyunsaturatedFattyAcidsOmega6: { type: Number },
    monounsaturatedFattyAcids: { type: Number },
    //vitamins
    vitaminA: {
        amount: { type: Number },
        unit: { type: String },
    },
    vitaminB1: {
        amount: { type: Number },
        unit: { type: String },
    },
    vitaminB2: {
        amount: { type: Number },
        unit: { type: String },
    },
    vitaminB5: {
        amount: { type: Number },
        unit: { type: String },
    },
    vitaminB6: {
        amount: { type: Number },
        unit: { type: String },
    },
    vitaminB12: {
        amount: { type: Number },
        unit: { type: String },
    },
    folicAcid: {
        amount: { type: Number },
        unit: { type: String },
    },
    biotin: {
        amount: { type: Number },
        unit: { type: String },
    },
    vitaminC: {
        amount: { type: Number },
        unit: { type: String },
    },
    vitaminD: {
        amount: { type: Number },
        unit: { type: String },
    },
    vitaminE: {
        amount: { type: Number },
        unit: { type: String },
    },
    vitaminPP: {
        amount: { type: Number },
        unit: { type: String },
    },
    vitaminK: {
        amount: { type: Number },
        unit: { type: String },
    },
    //minerals
    zinc: {
        amount: { type: Number },
        unit: { type: String },
    },
    phosphorus: {
        amount: { type: Number },
        unit: { type: String },
    },
    magnesium: {
        amount: { type: Number },
        unit: { type: String },
    },
    copper: {
        amount: { type: Number },
        unit: { type: String },
    },
    potassium: {
        amount: { type: Number },
        unit: { type: String },
    },
    selenium: {
        amount: { type: Number },
        unit: { type: String },
    },
    sodium: {
        amount: { type: Number },
        unit: { type: String },
    },
    calcium: {
        amount: { type: Number },
        unit: { type: String },
    },
    iron: {
        amount: { type: Number },
        unit: { type: String },
    },
    //measures
    measures: [
        {
            type: { type: String, required: true },
            amount: { type: Number, required: true },
            unit: { type: String, required: true },
        },
    ],
    //prices
    prices: [
        {
            shop: { type: String, required: true },
            price: { type: Number, required: true },
            currency: { type: String, required: true },
        },
    ],
}, {
    timestamps: true,
});
const ProductModel = mongoose_1.default.model('Product', ProductSchema);
exports.default = ProductModel;
