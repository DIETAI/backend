import { object, number, string, TypeOf, z, array, date } from 'zod';

const payload = {
  body: object({
    title: string({
      required_error: 'Asset title is required',
    }),
    description: string().optional(),
    imageURL: string({
      required_error: 'Image url is required',
    }),
    size: number({
      required_error: 'Size is required',
    }),
    key: string({
      required_error: 'AWS_S3 object key is required',
    }),
  }),
};

const params = {
  params: object({
    assetId: string({
      required_error: 'assetId is required',
    }),
  }),
};

const uploadImagePayload = {
  body: object({
    name: string({
      required_error: 'Image name is required',
    }),
    type: string({
      required_error: 'Image type is required',
    }),
  }),
};

export const uploadImageSchema = object({
  ...uploadImagePayload,
});

export const createAssetSchema = object({
  ...payload,
});

export const updateAssetSchema = object({
  ...payload,
  ...params,
});

export const deleteAssetSchema = object({
  ...params,
});

export const getAssetSchema = object({
  ...params,
});

export type UploadImageInput = TypeOf<typeof uploadImageSchema>;
export type CreateAssetInput = TypeOf<typeof createAssetSchema>;
export type UpdateAssetInput = TypeOf<typeof updateAssetSchema>;
export type GetAssetInput = TypeOf<typeof getAssetSchema>;
export type DeleteAssetInput = TypeOf<typeof deleteAssetSchema>;
