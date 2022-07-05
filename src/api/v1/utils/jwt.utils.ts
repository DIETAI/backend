import jwt from 'jsonwebtoken';
import config from 'config';

const getPrivateKey = (
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey'
) => {
  if (keyName === 'accessTokenPrivateKey') {
    return process.env.ACCESS_TOKEN_PRIVATE_KEY as string;
  }

  return process.env.REFRESH_PRIVATE_KEY as string;
};

const getPublicKey = (
  keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
) => {
  if (keyName === 'accessTokenPublicKey') {
    return process.env.ACCESS_TOKEN_PUBLIC_KEY as string;
  }

  return process.env.REFRESH_PUBLIC_KEY as string;
};

export function signJwt(
  object: Object,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options?: jwt.SignOptions | undefined
) {
  const signingKey = Buffer.from(getPrivateKey(keyName), 'base64').toString(
    'ascii'
  );

  return jwt.sign(object, signingKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
}

export function verifyJwt(
  token: string,
  keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
) {
  const publicKey = Buffer.from(getPublicKey(keyName), 'base64').toString(
    'ascii'
  );

  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null,
    };
  }
}
