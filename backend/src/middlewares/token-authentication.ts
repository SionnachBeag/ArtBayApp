import { jwtService } from '../services/JWT-service';
import { Request, Response, NextFunction } from 'express';

export default function tokenAuthentication() {
  return (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = (authHeader && authHeader.split(' ')[1]) as string;

    if (!token) {
      next({
        message: 'Token is missing',
        status: 404,
      });
    }

    const isValid: boolean = jwtService.verifyAccessToken(token);

    if (!isValid) {
      next({
        message: 'Token is not Valid',
        status: 498,
      });
    }
    next();
  };
}
