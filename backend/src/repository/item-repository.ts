import { db } from '../data/connection';
import { IBuyerDomainModel } from '../models/domain-models/IBuyerDomainModel';
import { IDBResultDomainModel } from '../models/domain-models/IDBResultDomainModel';
import { IItemByIdDomainModel } from '../models/domain-models/IItemByIdDomainModel';
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

  async listItemsBought(id: string): Promise<IItemDomainModel[]> {
    const itemsBought = await db.query<IItemDomainModel[]>(
      'SELECT * FROM items WHERE buyerId = ?',
      [`${id}`]
    );
    return itemsBought;
  },

  async getBuyerName(id: string): Promise<IBuyerDomainModel> {
    const buyerName = await db.query<IBuyerDomainModel[]>(
      'SELECT userName FROM users WHERE id = (SELECT buyerId FROM items WHERE id = ?)',
      [`${id}`]
    );
    return buyerName[0];
  },

  async getItemById(id: string): Promise<IItemByIdDomainModel> {
    const requestedItem = await db.query<IItemByIdDomainModel[]>(
      'SELECT items.id, items.title, items.description, items.imgUrl, items.price, items.isSold, users.userName FROM items JOIN users ON users.id = items.sellerId WHERE items.id = ?',
      [`${id}`]
    );
    return requestedItem[0];
  },

  async buyItem(id: string, buyerId: string): Promise<number> {
    const repoResponse = await db.query<any>(
      'UPDATE items SET isSold = true, buyerId = ? WHERE id = ?',
      [buyerId, id]
    );
    return repoResponse.affectedRows;
  },

  async takeMoney(id: string, price: number): Promise<number> {
    const repoResponse = await db.query<any>(
      'UPDATE users SET artDollars = artDollars - ? WHERE id = ?',
      [`${price}`, id]
    );
    return repoResponse.affectedRows;
  },
};
