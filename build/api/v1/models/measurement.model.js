"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const MeasurementSchema = new Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    client: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Client' },
    name: { type: String, required: true },
    date: { type: Date, required: true },
    // sex: { type: String, required: true },
    notes: { type: String },
    images: [{ type: String }],
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    // age: { type: Number, required: true },
    // pal: { type: Number, required: true },
    bmi: { type: Number, required: true },
    // bmi_type: { type: String, required: true },
    ppmMifflin: { type: Number, required: true },
    ppmHarris: { type: Number, required: true },
    cpm: { type: Number, required: true },
    whr: { type: Number },
    whtr: { type: Number },
    ymca: { type: Number },
    chest_breath: { type: Number },
    chest_exhaust: { type: Number },
    shoulder: { type: Number },
    shoulder_tonus: { type: Number },
    waist: { type: Number },
    hip: { type: Number },
    forearm: { type: Number },
    thigh: { type: Number },
    calf: { type: Number },
    biceps: { type: Number },
    triceps: { type: Number },
    shoulder_blade: { type: Number },
    ala_of_ilium: { type: Number },
    iliac_spine: { type: Number },
}, {
    timestamps: true,
});
const MeasurementModel = mongoose_1.default.model('Measurement', MeasurementSchema);
exports.default = MeasurementModel;
