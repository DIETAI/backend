"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const CalendarSchema = new Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date },
}, {
    timestamps: true,
});
const CalendarModel = mongoose_1.default.model('Calendar', CalendarSchema);
exports.default = CalendarModel;
