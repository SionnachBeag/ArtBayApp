import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { expireTimeIn } from '../config';

dotenv.config();

export const jwtService = {
  async generateAccessToken(userId: number, userName: string): Promise<string> {
    const key: string = `${process.env.SECRET_KEY}`;
    return jwt.sign({ userId: userId, userName: userName }, key, {
      expiresIn: expireTimeIn,
    });
  },

  verifyAccessToken(token: string): boolean {
    try {
      const jwtPayload = jwt.verify(
        token,
        `${process.env.SECRET_KEY}`
      ) as jwt.JwtPayload;
      const expireTime = jwtPayload.exp as number;
      return Date.now() < expireTime * 1000 ? true : false;
    } catch (err) {
      return false;
    }
  },

  getUserIdFromToken(token: string): number {
    token = token.split(' ')[1];
    const jwtPayload = jwt.verify(
      token,
      `${process.env.SECRET_KEY}`
    ) as jwt.JwtPayload;
    return jwtPayload.userId;
  },
};
