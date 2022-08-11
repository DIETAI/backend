"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssetSchema = exports.deleteAssetSchema = exports.updateAssetSchema = exports.createAssetSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        title: (0, zod_1.string)({
            required_error: 'Asset title is required',
        }),
        description: (0, zod_1.string)().optional(),
        imageURL: (0, zod_1.string)({
            required_error: 'Image url is required',
        }),
    }),
};
const params = {
    params: (0, zod_1.object)({
        assetId: (0, zod_1.string)({
            required_error: 'assetId is required',
        }),
    }),
};
exports.createAssetSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateAssetSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.deleteAssetSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getAssetSchema = (0, zod_1.object)(Object.assign({}, params));
