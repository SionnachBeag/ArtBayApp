import { IItemDomainModel } from '../models/domain-models/IItemDomainModel';
import { ICreateItemRequestModel } from '../models/request-models/ICreateItemRequestModel';
import { itemRepository } from '../repository/item-repository';

export const itemService = {
  async addItem(newItem: ICreateItemRequestModel): Promise<number> {
    return await itemRepository.addItem(newItem);
  },

  async listAllItemsOnSale(): Promise<IItemDomainModel[]> {
    return await itemRepository.listAllItemsOnSale();
  },

  async getItemById(id: string): Promise<IItemDomainModel> {
    const itemById = await itemRepository.getItemById(id);
    if (!itemById) {
      return Promise.reject({
        message: 'item is not found',
        status: 404,
      });
    }
    return itemById;
  },
};
