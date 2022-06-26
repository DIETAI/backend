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
  }),
};

const params = {
  params: object({
    assetId: string({
      required_error: 'assetId is required',
    }),
  }),
};

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

export type CreateAssetInput = TypeOf<typeof createAssetSchema>;
export type UpdateAssetInput = TypeOf<typeof updateAssetSchema>;
export type GetAssetInput = TypeOf<typeof getAssetSchema>;
export type DeleteAssetInput = TypeOf<typeof deleteAssetSchema>;
