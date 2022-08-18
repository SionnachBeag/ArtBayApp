import { db } from '../data/connection';
import { IRegisterDomainModel } from '../models/domain-models/IRegisterDomainModel';
import { IUserDomainModel } from '../models/domain-models/IUserDomainModel';
import { IRegisterRequestModel } from '../models/request-models/IRegisterRequestModel';

export const userRepository = {
  async getUserByUsername(userName: string): Promise<IUserDomainModel> {
    const userByUsername = await db.query<IUserDomainModel[]>(
      'SELECT * FROM users WHERE userName = ?',
      [userName]
    );
    return userByUsername[0];
  },

  async getUserByEmail(email: string): Promise<IUserDomainModel> {
    const userByEmail = await db.query<IUserDomainModel[]>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return userByEmail[0];
  },

  async register(
    newUser: IRegisterRequestModel
  ): Promise<IRegisterDomainModel> {
    const repoResponse = await db.query<IRegisterDomainModel>(
      `INSERT INTO users (userName, email, password) VALUES (?,?,?)`,
      [newUser.userName, newUser.email, newUser.password]
    );
    return repoResponse;
  },
};
