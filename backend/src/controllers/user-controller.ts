import { NextFunction, Request, Response } from 'express';
import { ApiErrorModel } from '../models/ApiErrorModel';
import { IUserDomainModel } from '../models/domain-models/IUserDomainModel';
import { ILoginRequestModel } from '../models/request-models/ILoginRequestModel';
import { IRegisterRequestModel } from '../models/request-models/IRegisterRequestModel';
import { IDollarsByUserViewModel } from '../models/view-models/IDollarsByUserViewModel';
import { ILoginViewModel } from '../models/view-models/ILoginViewModel';
import { ISuccessViewModel } from '../models/view-models/ISuccessViewModel';
import { emailService } from '../services/email-service';
import { jwtService } from '../services/JWT-service';
import { passwordService } from '../services/password-service';
import { userService } from '../services/user-service';

export const userController = {
  async register(
    req: Request<IRegisterRequestModel>,
    res: Response<ISuccessViewModel>,
    next: NextFunction
  ): Promise<void> {
    const newUser: IRegisterRequestModel = {
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    };

    const isPasswordValid: boolean = passwordService.checkPassword(
      newUser.password
    );

    if (!isPasswordValid) {
      return next({
        message:
          'password must be at least 8 characters and contain letter and number',
        status: 422,
      });
    }

    const isEmailValid: boolean = emailService.emailCheck(newUser.email);

    if (!isEmailValid) {
      return next({
        message: 'email is invalid',
        status: 422,
      });
    }

    await userService
      .register(newUser)
      .then(() => {
        return res.json({
          status: 201,
          message: 'Registration was successful.',
        });
      })
      .catch((err: ApiErrorModel) => {
        console.log(err);
        next(err);
        return;
      });
  },

  async login(
    req: Request<ILoginRequestModel>,
    res: Response<ILoginViewModel>,
    next: NextFunction
  ): Promise<void> {
    const loginAttempt: ILoginRequestModel = {
      userName: req.body.userName,
      password: req.body.password,
    };

    await userService
      .login(loginAttempt)
      .then(async (userData: IUserDomainModel) => {
        const jwtToken: string = await jwtService.generateAccessToken(
          userData.id,
          userData.userName
        );
        return res.status(200).json({
          status: 200,
          userName: userData.userName,
          artDollars: userData.artDollars,
          token: jwtToken,
        });
      })
      .catch((err: ApiErrorModel) => {
        console.log(err);
        next(err);
        return;
      });
  },

  async getDollarsByUser(
    req: Request,
    res: Response<IDollarsByUserViewModel>,
    next: NextFunction
  ) {
    const { id } = <{ id: string }>req.params;

    await userService
      .getDollarsByUser(id)
      .then((data) => {
        return res.json(data);
      })
      .catch((err: ApiErrorModel) => {
        console.log(err);
        next(err);
        return;
      });
  },
};
