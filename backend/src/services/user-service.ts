import { IDBResultDomainModel } from '../models/domain-models/IDBResultDomainModel';
import { IDollarsModel } from '../models/domain-models/IDollarsModel';
import { IUserDomainModel } from '../models/domain-models/IUserDomainModel';
import { ILoginRequestModel } from '../models/request-models/ILoginRequestModel';
import { IRegisterRequestModel } from '../models/request-models/IRegisterRequestModel';
import { userRepository } from '../repository/user-repository';
import { passwordService } from './password-service';

export const userService = {
  async register(
    newUser: IRegisterRequestModel
  ): Promise<IDBResultDomainModel> {
    const userDataByUserName: IUserDomainModel =
      await userRepository.getUserByUsername(newUser.userName);
    if (userDataByUserName) {
      return Promise.reject({
        message: 'Username already taken',
        status: 422,
      });
    }
    const userDataByEmail: IUserDomainModel =
      await userRepository.getUserByEmail(newUser.email);
    if (userDataByEmail) {
      return Promise.reject({
        message: 'Email already taken',
        status: 422,
      });
    }
    newUser.password = passwordService.generateHash(newUser.password);
    return await userRepository.register(newUser);
  },

  async login(loginAttempt: ILoginRequestModel): Promise<IUserDomainModel> {
    const userDataByUserName: IUserDomainModel =
      await userRepository.getUserByUsername(loginAttempt.userName);
    if (!userDataByUserName) {
      return Promise.reject({
        message: 'Username or password is incorrect.',
        status: 422,
      });
    }
    const passwordIsTheSame: boolean = passwordService.comparePasswords(
      loginAttempt.password,
      userDataByUserName.password
    );
    if (!passwordIsTheSame) {
      return Promise.reject({
        message: 'Username or password is incorrect',
        status: 422,
      });
    }
    return userDataByUserName;
  },

  async getDollarsByUser(id: string): Promise<IDollarsModel> {
    const repoResponse = await userRepository.getDollarsByUser(id);
    const dollarObj: IDollarsModel = {
      artDollars: repoResponse,
    };
    return dollarObj;
  },
};
