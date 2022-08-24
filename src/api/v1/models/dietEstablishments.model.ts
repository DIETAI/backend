import mongoose from 'mongoose';
import { IDietEstablishmentDocument } from '../interfaces/dietEstablishments.interfaces';

const Schema = mongoose.Schema;

const DietEstablishmentSchema = new Schema<IDietEstablishmentDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    name: { type: String, required: true },
    folder: { type: String },
    description: { type: String },
    dietKind: { type: String },
    measurementId: { type: mongoose.Schema.Types.ObjectId, ref: 'Measurement' },
    clientMeasurementCpm: { type: Boolean, required: true },
    kcal: { type: Number, required: true },
    meals: [
      {
        _id: { type: String, required: true },
        time: { type: String, required: true },
        name: { type: String, required: true },
        type: { type: String, required: true },
        procent: { type: Number, required: true },
        kcal: { type: Number, required: true },
      },
    ],
    protein: {
      gram: { type: Number, required: true },
      kcal: { type: Number, required: true },
      procent: { type: Number, required: true },
    },
    fat: {
      gram: { type: Number, required: true },
      kcal: { type: Number, required: true },
      procent: { type: Number, required: true },
    },
    carbohydrates: {
      gram: { type: Number, required: true },
      kcal: { type: Number, required: true },
      procent: { type: Number, required: true },
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
      procent: { type: Number },
    },
    vegetableProtein: {
      gram: { type: Number },
      kcal: { type: Number },
      procent: { type: Number },
    },
    carbohydrateExchangers: { type: Number, required: true },
    proteinFatExchangers: { type: Number, required: true },
    saturatedFattyAcids: { type: Number },
    pollyunsaturatedFattyAcids: { type: Number },
    pollyunsaturatedFattyAcidsOmega3: { type: Number },
    pollyunsaturatedFattyAcidsOmega6: { type: Number },
    monounsaturatedFattyAcids: { type: Number },
    vitaminA: {
      amount: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    vitaminB2: {
      amount: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    vitaminB5: {
      amount: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    vitaminB6: {
      amount: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    vitaminB12: {
      amount: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    folicAcid: {
      amount: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    biotin: {
      amount: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    vitaminC: {
      amount: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    vitaminD: {
      amount: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    vitaminE: {
      amount: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    vitaminPP: {
      amount: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    vitaminK: {
      amount: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    zinc: {
      amount: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    phosphorus: {
      amount: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    magnesium: {
      amount: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    copper: {
      amount: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    potassium: {
      amount: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    selenium: {
      amount: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    sodium: {
      amount: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    calcium: {
      amount: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    iron: {
      amount: { type: Number, required: true },
      unit: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const DietEstablishmentModel = mongoose.model<IDietEstablishmentDocument>(
  'DietEstablishment',
  DietEstablishmentSchema
);

export default DietEstablishmentModel;
