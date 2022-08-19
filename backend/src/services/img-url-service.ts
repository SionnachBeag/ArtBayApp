export const imgUrlService = {
  imgUrlCheck(url: string): boolean {
    const regex = new RegExp(`[\/.](gif|jpg|jpeg|tiff|png)$`);
    return regex.test(url);
  },
};
