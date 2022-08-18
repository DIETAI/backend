"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.totalSchemaValues = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.totalSchemaValues = {
    kcal: { type: Number, required: true },
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
};