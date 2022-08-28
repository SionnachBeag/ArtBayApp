export interface IItemsOnSaleViewModel {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
  price: number;
  buyerId?: number;
  isSold: boolean;
  userId: number;
}
