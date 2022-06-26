import { IRoleInput } from '../interfaces/roles.interfaces';
import { NextFunction, Request, Response } from 'express';

import { getUser } from '../services/user.service';

export const roleCheck = (roles: IRoleInput['type'][]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // const userId = req.userId;
    // const user = await getUser({ uid: userId });

    // console.log(user);
    console.log('Role check');
    // //find user
    // //find role

    // roles.includes('admin');
    next();
  };
};
