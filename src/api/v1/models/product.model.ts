import mongoose from 'mongoose';
import { IProductDocument } from '../interfaces/products.interfaces';

const Schema = mongoose.Schema;

const ProductSchema = new Schema<IProductDocument>(
  {
    user: {
      type: mongoose.Schema.Types.String,
      ref: 'User',
      required: true,
    },
    name: { type: String, required: true },
    kcal: { type: Number, required: true },
    image: {
      type: String,
      default:
        'https://icon-library.com/images/products-icon-png/products-icon-png-9.jpg',
    },
    gallery: [{ type: String }],
    description: { type: String },
    subGroupId: { type: String },
    season: { type: String },
    dietKindsExclude: [{ type: String }],
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
      unit: { type: String, required: true },
    },
    vitaminB2: {
      amount: { type: Number },
      unit: { type: String, required: true },
    },
    vitaminB5: {
      amount: { type: Number },
      unit: { type: String, required: true },
    },
    vitaminB6: {
      amount: { type: Number },
      unit: { type: String, required: true },
    },
    vitaminB12: {
      amount: { type: Number },
      unit: { type: String, required: true },
    },
    folicAcid: {
      amount: { type: Number },
      unit: { type: String, required: true },
    },
    biotin: {
      amount: { type: Number },
      unit: { type: String, required: true },
    },
    vitaminC: {
      amount: { type: Number },
      unit: { type: String, required: true },
    },
    vitaminD: {
      amount: { type: Number },
      unit: { type: String, required: true },
    },
    vitaminE: {
      amount: { type: Number },
      unit: { type: String, required: true },
    },
    vitaminPP: {
      amount: { type: Number },
      unit: { type: String, required: true },
    },
    vitaminK: {
      amount: { type: Number },
      unit: { type: String, required: true },
    },
    //minerals
    zinc: {
      amount: { type: Number },
      unit: { type: String, required: true },
    },
    phosphorus: {
      amount: { type: Number },
      unit: { type: String, required: true },
    },
    magnesium: {
      amount: { type: Number },
      unit: { type: String, required: true },
    },
    copper: {
      amount: { type: Number },
      unit: { type: String, required: true },
    },
    potassium: {
      amount: { type: Number },
      unit: { type: String, required: true },
    },
    selenium: {
      amount: { type: Number },
      unit: { type: String, required: true },
    },
    sodium: {
      amount: { type: Number },
      unit: { type: String, required: true },
    },
    calcium: {
      amount: { type: Number },
      unit: { type: String, required: true },
    },
    iron: {
      amount: { type: Number },
      unit: { type: String, required: true },
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
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<IProductDocument>('Product', ProductSchema);

export default ProductModel;
