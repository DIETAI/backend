import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';
import { IUserDocument } from '../interfaces/user.interfaces';

const Schema = mongoose.Schema;

const UserSchema = new Schema<IUserDocument>(
  {
    // uid: { type: String, required: true },
    // providerId: { type: String, required: true },
    fullName: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    emailVerified: { type: Boolean, default: false },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    phoneNumber: { type: String },
    photoURL: {
      type: String,
      default:
        'https://upload.wikimedia.org/wikipedia/commons/7/7c/User_font_awesome.svg',
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
  let user = this as IUserDocument;

  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as IUserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const UserModel = mongoose.model<IUserDocument>('User', UserSchema);

export default UserModel;
