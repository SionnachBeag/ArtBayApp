import { db } from '../data/connection';
import { IDBResultDomainModel } from '../models/domain-models/IDBResultDomainModel';
import { IItemDomainModel } from '../models/domain-models/IItemDomainModel';
import { ICreateItemRequestModel } from '../models/request-models/ICreateItemRequestModel';

export const itemRepository = {
  async addItem(newItem: ICreateItemRequestModel): Promise<number> {
    const repoResponse = await db.query<IDBResultDomainModel>(
      'INSERT INTO items (title, description, imgUrl, price, sellerId) VALUES (?, ?, ?, ?, ?)',
      [
        newItem.title,
        newItem.description,
        newItem.imgUrl,
        `${newItem.price}`,
        `${newItem.sellerId}`,
      ]
    );
    return repoResponse.insertId;
  },

  async listAllItemsOnSale(): Promise<IItemDomainModel[]> {
    const isSold: number = 0;
    const itemsOnSale = await db.query<IItemDomainModel[]>(
      'SELECT * FROM items WHERE isSold = ?',
      [`${isSold}`]
    );
    return itemsOnSale;
  },
};
