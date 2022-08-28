export interface IItemDomainModel {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
  price: number;
  isSold: boolean;
  buyerId?: number;
  userId: number;
}
