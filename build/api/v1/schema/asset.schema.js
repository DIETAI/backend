"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssetSchema = exports.deleteAssetSchema = exports.updateAssetSchema = exports.createAssetSchema = exports.uploadImageSchema = void 0;
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
        size: (0, zod_1.number)({
            required_error: 'Size is required',
        }),
        key: (0, zod_1.string)({
            required_error: 'AWS_S3 object key is required',
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
const uploadImagePayload = {
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'Image name is required',
        }),
        type: (0, zod_1.string)({
            required_error: 'Image type is required',
        }),
        size: (0, zod_1.number)({
            required_error: 'Image size is required',
        }),
    }),
};
exports.uploadImageSchema = (0, zod_1.object)(Object.assign({}, uploadImagePayload));
exports.createAssetSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateAssetSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.deleteAssetSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getAssetSchema = (0, zod_1.object)(Object.assign({}, params));
