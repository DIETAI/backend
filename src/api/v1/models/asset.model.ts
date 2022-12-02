import mongoose from 'mongoose';
import { IAssetDocument } from '../interfaces/assets.interfaces';

const Schema = mongoose.Schema;

const AssetSchema = new Schema<IAssetDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String },
    imageURL: { type: String, required: true },
    size: { type: Number, required: true },
    key: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const AssetModel = mongoose.model<IAssetDocument>('Asset', AssetSchema);

export default AssetModel;
