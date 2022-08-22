import { IBuyerDomainModel } from '../models/domain-models/IBuyerDomainModel';
import { IItemByIdDomainModel } from '../models/domain-models/IItemByIdDomainModel';
import { IItemDomainModel } from '../models/domain-models/IItemDomainModel';
import { IItemAndBuyerModel } from '../models/IItemAndBuyerModel';
import { ICreateItemRequestModel } from '../models/request-models/ICreateItemRequestModel';
import { itemRepository } from '../repository/item-repository';

export const itemService = {
  async addItem(newItem: ICreateItemRequestModel): Promise<number> {
    return await itemRepository.addItem(newItem);
  },

  async listAllItemsOnSale(): Promise<IItemDomainModel[]> {
    return await itemRepository.listAllItemsOnSale();
  },

  async listItemsBought(id: string): Promise<IItemDomainModel[]> {
    return await itemRepository.listItemsBought(id);
  },

  async getItemById(
    id: string
  ): Promise<IItemByIdDomainModel | IItemAndBuyerModel> {
    let itemById = await itemRepository.getItemById(id);
    if (!itemById) {
      return Promise.reject({
        message: 'item is not found',
        status: 404,
      });
    }

    if (itemById.isSold) {
      const buyerName: IBuyerDomainModel = await itemRepository.getBuyerName(
        id
      );
      const addBuyerName = (
        input: IItemByIdDomainModel
      ): IItemAndBuyerModel => {
        return {
          ...input,
          buyerName: buyerName.userName,
        };
      };
      itemById = addBuyerName(itemById);
    }
    return itemById;
  },
};
