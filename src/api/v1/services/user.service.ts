import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import { omit } from 'lodash';
import UserModel from '../models/user.model';
import { IUserDocument, IUserInput } from '../interfaces/user.interfaces';
import axios from 'axios';
import log from '../utils/logger';
import qs from 'qs';

export async function createUser(input: IUserInput) {
  try {
    const user = await UserModel.create(input);

    return omit(user.toJSON(), 'password');
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), 'password');
}

export async function getUser(query: FilterQuery<IUserDocument>) {
  return UserModel.findOne(query).lean();
}

interface GoogleTokensResult {
  access_token: string;
  expires_in: Number;
  refresh_token: string;
  scope: string;
  id_token: string;
}

// export async function getGoogleOAuthTokens({
//   code,
// }: {
//   code: string;
// }): Promise<GoogleTokensResult> {
//   const url = 'https://oauth2.googleapis.com/token';

//   const values = {
//     code,
//     client_id: config.get('googleClientId'),
//     client_secret: config.get('googleClientSecret'),
//     redirect_uri: config.get('googleOauthRedirectUrl'),
//     grant_type: 'authorization_code',
//   };

//   try {
//     const res = await axios.post<GoogleTokensResult>(
//       url,
//       qs.stringify(values),
//       {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       }
//     );
//     return res.data;
//   } catch (error: any) {
//     console.error(error.response.data.error);
//     log.error(error, 'Failed to fetch Google Oauth Tokens');
//     throw new Error(error.message);
//   }
// }

// interface GoogleUserResult {
//   id: string;
//   email: string;
//   verified_email: boolean;
//   name: string;
//   given_name: string;
//   family_name: string;
//   picture: string;
//   locale: string;
// }

// export async function getGoogleUser({
//   id_token,
//   access_token,
// }: {
//   id_token: string;
//   access_token: string;
// }): Promise<GoogleUserResult> {
//   try {
//     const res = await axios.get<GoogleUserResult>(
//       `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
//       {
//         headers: {
//           Authorization: `Bearer ${id_token}`,
//         },
//       }
//     );
//     return res.data;
//   } catch (error: any) {
//     log.error(error, 'Error fetching Google user');
//     throw new Error(error.message);
//   }
// }

export async function findAndUpdateUser(
  query: FilterQuery<IUserDocument>,
  update: UpdateQuery<IUserDocument>,
  options: QueryOptions = {}
) {
  return UserModel.findOneAndUpdate(query, update, options);
}

export async function validateEmail(email: string) {
  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    return true;
  }

  return false;
}
