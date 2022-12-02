"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAsset = exports.getAndUpdateAsset = exports.getAssets = exports.getAsset = exports.createAsset = exports.uploadImage = void 0;
const crypto_1 = __importDefault(require("crypto"));
const util_1 = require("util");
const asset_model_1 = __importDefault(require("../models/asset.model"));
const metrics_1 = require("../utils/metrics");
//aws
const s3_1 = __importDefault(require("aws-sdk/clients/s3"));
const s3 = new s3_1.default({
    region: 'eu-central-1',
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    signatureVersion: 'v4',
});
const randomBytes = (0, util_1.promisify)(crypto_1.default.randomBytes);
// import { DeleteObjectCommand } from "@aws-sdk/client-s3";
// import { s3Client } from "./libs/s3Client.js" // Helper function that creates Amazon S3 service client module.
// export const bucketParams = { Bucket: "BUCKET_NAME", Key: "KEY" };
// export const run = async () => {
//   try {
//     const data = await s3Client.send(new DeleteObjectCommand(bucketParams));
//     console.log("Success. Object deleted.", data);
//     return data; // For unit tests.
//   } catch (err) {
//     console.log("Error", err);
//   }
// };
function uploadImage(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const metricsLabels = {
            operation: 'uploadImage',
        };
        const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
        // const fileParams = {
        //   Bucket: 'diet-ai',
        //   Key: input.name,
        //   Expires: 600,
        //   ContentType: input.type,
        //   ACL: 'public-read',
        // };
        const rawBytes = yield randomBytes(16);
        const imageName = rawBytes.toString('hex');
        const fileParams = {
            Bucket: 'diet-ai',
            Key: imageName,
            Expires: 600,
            ContentType: input.type,
            ACL: 'public-read',
        };
        // const awsObject = s3.getObject(
        //   { Key: '52d8de2670bef579191cd08a3b8c7333', Bucket: 'diet-ai' },
        //   (err, data) => console.log({ data })
        // );
        // data: {
        //   AcceptRanges: 'bytes',
        //   LastModified: 2022-12-02T10:54:40.000Z,
        //   ContentLength: 7138,
        //   ETag: '"5b67a97815053304f2fd928c5ab7021b"',
        //   ContentType: 'multipart/form-data',
        //   ServerSideEncryption: 'AES256',
        //   Metadata: {},
        //   Body: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 01 5f 00 00 01 5f 08 06 00 00 00 e9 b5 cf 81 00 00 00 09 70 48 59 73 00 00 0b 13 00 00 0b 13 01 ... 7088 more bytes>
        // }
        //https://stackoverflow.com/questions/27753411/how-do-i-delete-an-object-on-aws-s3-using-javascript
        // s3.deleteObject()
        //   AWS.config.update({
        //     accessKeyId: "*****",
        //     secretAccessKey: "****",
        //     region: region,
        //     version: "****"
        // });
        // const s3 = new AWS.S3();
        // const params = {
        //     Bucket: s3BucketName,
        //     Key: "filename" //if any sub folder-> path/of/the/folder.ext
        // }
        // try {
        // await s3.headObject(params).promise()
        // console.log("File Found in S3")
        // try {
        //     await s3.deleteObject(params).promise()
        //     console.log("file deleted Successfully")
        // }
        // catch (err) {
        //      console.log("ERROR in file Deleting : " + JSON.stringify(err))
        // }
        // } catch (err) {
        //     console.log("File not Found ERROR : " + err.code)
        // }
        //https://www.youtube.com/watch?v=yGYeYJpRWPM
        try {
            const url = yield s3.getSignedUrlPromise('putObject', fileParams);
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'true' }));
            return { url, key: imageName };
        }
        catch (e) {
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'false' }));
            throw e;
        }
    });
}
exports.uploadImage = uploadImage;
function createAsset(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const metricsLabels = {
            operation: 'createAsset',
        };
        const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
        try {
            const result = yield asset_model_1.default.create(input);
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'true' }));
            return result;
        }
        catch (e) {
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'false' }));
            throw e;
        }
    });
}
exports.createAsset = createAsset;
function getAsset(query, options = { lean: true }) {
    return __awaiter(this, void 0, void 0, function* () {
        const metricsLabels = {
            operation: 'getAsset',
        };
        const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
        try {
            const result = yield asset_model_1.default.findOne(query, {}, options);
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'true' }));
            return result;
        }
        catch (e) {
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'false' }));
            // throw e;
            return null;
        }
    });
}
exports.getAsset = getAsset;
function getAssets(query, options = { lean: true }) {
    return __awaiter(this, void 0, void 0, function* () {
        const metricsLabels = {
            operation: 'getAssets',
        };
        const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
        try {
            const result = yield asset_model_1.default.find(query, {}, options);
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'true' }));
            return result;
        }
        catch (e) {
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'false' }));
            throw e;
        }
    });
}
exports.getAssets = getAssets;
function getAndUpdateAsset(query, update, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return asset_model_1.default.findOneAndUpdate(query, update, options);
    });
}
exports.getAndUpdateAsset = getAndUpdateAsset;
function deleteAsset(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return asset_model_1.default.deleteOne(query);
    });
}
exports.deleteAsset = deleteAsset;
