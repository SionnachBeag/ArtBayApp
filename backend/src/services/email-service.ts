export const emailService = {
  emailCheck(checkingEmail: string): boolean {
    const regex = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
    return regex.test(checkingEmail);
  },
};
