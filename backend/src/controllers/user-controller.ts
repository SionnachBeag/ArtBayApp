import { NextFunction, Request, Response } from 'express';
import { ILoginRequestModel } from '../models/request-models/ILoginRequestModel';
import { IRegisterRequestModel } from '../models/request-models/IRegisterRequestModel';
import { ILoginViewModel } from '../models/view-models/ILoginViewModel';
import { IRegisterViewModel } from '../models/view-models/IRegisterViewModel';

export const userController = {
  async register(
    req: Request<IRegisterRequestModel>,
    res: Response<IRegisterViewModel>,
    next: NextFunction
  ) {},

  async login(
    req: Request<ILoginRequestModel>,
    res: Response<ILoginViewModel>,
    next: NextFunction
  ) {},
};
