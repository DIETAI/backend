import { IRoleInput } from '../interfaces/roles.interfaces';
import { NextFunction, Request, Response } from 'express';

export const roleCheck = (roles: IRoleInput['type'][]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log('Role check');
    next();
  };
};
