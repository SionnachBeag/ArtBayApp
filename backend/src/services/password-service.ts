import { saltRounds } from '../config';

const bcrypt = require('bcrypt');

export const passwordService = {
  generateHash(password: string): string {
    return bcrypt.hashSync(password, saltRounds);
  },

  comparePasswords(password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  },

  checkPassword(password: string): boolean {
    let passwordPattern: RegExp = /^(?=.*\d)(?=.*[a-z]).{6,}$/;
    return passwordPattern.test(password);
  },
};
