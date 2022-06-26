import mongoose from 'mongoose';
import { IRoleDocument } from '../interfaces/roles.interfaces';

const Schema = mongoose.Schema;

const RoleSchema = new Schema<IRoleDocument>(
  {
    type: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const RoleModel = mongoose.model<IRoleDocument>('Role', RoleSchema);

export default RoleModel;
