import { Request, Response, NextFunction } from 'express';
import { ApiErrorModel } from '../models/ApiErrorModel';

export default function requestBodyValidator(
  keys: string[],
  statusCode: number
) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const toValidate: any = req.body;
    let errorObj = {} as ApiErrorModel;
    let multi: boolean = false;
    if (toValidate) {
      for (let key of keys) {
        if (
          !(key in toValidate) ||
          (!toValidate[key] && toValidate[key] !== '' && toValidate[key] !== 0)
        ) {
          if (errorObj.message) {
            multi = true;
            errorObj.message += `, ${key}`;
          } else {
            errorObj.message = `${key}`;
          }
        }
      }
      if (errorObj.message) {
        errorObj.message = `${errorObj.message} ${
          multi ? 'are' : 'is'
        } required`;
        errorObj.status = statusCode;
        next(errorObj);
      }
      next();
    }
  };
}
