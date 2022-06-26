import * as firebase from '../utils/firebase';
import { NextFunction, Request, Response } from 'express';
import { IUserDocument } from '../interfaces/user.interfaces';

declare module 'express-serve-static-core' {
  interface Request {
    authToken: string;
    userId: string;
  }
}

const getAuthToken = (req: Request, res: Response, next: NextFunction) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    req.authToken = req.headers.authorization.split(' ')[1];
  }
  next();
};

export const userAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await firebase.default.auth().verifyIdToken(authToken);
      req.userId = userInfo.uid;

      console.log(userInfo.exp);
      return next();
    } catch (e) {
      return res
        .status(401)
        .send({ error: 'You are not authorized to make this request' });
    }
  });
};
