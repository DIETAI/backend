"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const total_schema_1 = require("../total/total.schema");
const Schema = mongoose_1.default.Schema;
const DinnerPortionSchema = new Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    dinnerId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Dinner' },
    dinnerProducts: {
        required: true,
        type: [
            {
                dinnerProductId: {
                    type: mongoose_1.default.Schema.Types.ObjectId,
                    ref: 'DinnerProduct',
                },
                portion: { type: Number, required: true },
                total: Object.assign({}, total_schema_1.totalSchemaValues),
                // total: {
                //   kcal: { type: Number },
                // },
            },
        ],
    },
    // total: {
    //   kcal: { type: Number },
    // },
    total: Object.assign({}, total_schema_1.totalSchemaValues),
    type: { type: String, required: true },
}, {
    timestamps: true,
});
const DinnerPortionModel = mongoose_1.default.model('DinnerPortion', DinnerPortionSchema);
exports.default = DinnerPortionModel;
