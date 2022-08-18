import { Request, Response, NextFunction } from 'express';
import { ApiErrorModel } from '../models/ApiErrorModel';

export default function requestParamValidator(
  keys: string[],
  statusCode: number
) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const toValidateParams: any = req.params;
    let errorObj = {} as ApiErrorModel;
    if (Object.keys(toValidateParams).length > 0) {
      if (toValidateParams[keys[0]] === 'undefined') {
        errorObj.message = `The ${keys[0]} params is missing.`;
        if (errorObj.message) {
          errorObj.status = statusCode;
          next(errorObj);
        }
      } else if (isNaN(+toValidateParams[keys[0]])) {
        errorObj.message = `The ${keys[0]} params is not a number.`;
        if (errorObj.message) {
          errorObj.status = statusCode;
          next(errorObj);
        }
      }
      next();
    }
  };
}
