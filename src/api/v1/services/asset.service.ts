import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import crypto from 'crypto';
import { promisify } from 'util';

import AssetModel from '../models/asset.model';
import {
  IAssetInput,
  IAssetDocument,
  IUploadImageInput,
} from '../interfaces/assets.interfaces';

import { databaseResponseTimeHistogram } from '../utils/metrics';

//aws
import S3 from 'aws-sdk/clients/s3';

const s3 = new S3({
  region: 'eu-central-1',
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  signatureVersion: 'v4',
});

const randomBytes = promisify(crypto.randomBytes);

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

export async function uploadImage(input: IUploadImageInput) {
  const metricsLabels = {
    operation: 'uploadImage',
  };

  const timer = databaseResponseTimeHistogram.startTimer();

  // const fileParams = {
  //   Bucket: 'diet-ai',
  //   Key: input.name,
  //   Expires: 600,
  //   ContentType: input.type,
  //   ACL: 'public-read',
  // };

  const rawBytes = await randomBytes(16);
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
    const url = await s3.getSignedUrlPromise('putObject', fileParams);
    timer({ ...metricsLabels, success: 'true' });
    return { url, key: imageName };
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function createAsset(input: IAssetInput) {
  const metricsLabels = {
    operation: 'createAsset',
  };
  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const result = await AssetModel.create(input);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function getAsset(
  query: FilterQuery<IAssetDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getAsset',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await AssetModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    // throw e;
    return null;
  }
}

export async function getAssets(
  query: FilterQuery<IAssetDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getAssets',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await AssetModel.find(query, {}, options);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getAndUpdateAsset(
  query: FilterQuery<IAssetDocument>,
  update: UpdateQuery<IAssetDocument>,
  options: QueryOptions
) {
  return AssetModel.findOneAndUpdate(query, update, options);
}

export async function deleteAsset(query: FilterQuery<IAssetDocument>) {
  return AssetModel.deleteOne(query);
}
