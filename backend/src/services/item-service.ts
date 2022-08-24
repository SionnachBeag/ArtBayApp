import { IBuyerDomainModel } from '../models/domain-models/IBuyerDomainModel';
import { IItemByIdDomainModel } from '../models/domain-models/IItemByIdDomainModel';
import { IItemDomainModel } from '../models/domain-models/IItemDomainModel';
import { IItemAndBuyerModel } from '../models/IItemAndBuyerModel';
import { ICreateItemRequestModel } from '../models/request-models/ICreateItemRequestModel';
import { IUpdateItemRequestModel } from '../models/request-models/IUpdateItemRequestModel';
import { itemRepository } from '../repository/item-repository';
import { userRepository } from '../repository/user-repository';

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

  async listItemsByUser(id: string): Promise<IItemDomainModel[]> {
    return await itemRepository.listItemsByUser(id);
  },

  async getItemById(
    id: string
  ): Promise<IItemByIdDomainModel | IItemAndBuyerModel> {
    let itemById: IItemByIdDomainModel = await itemRepository.getItemById(id);
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

  async buyItem(id: string, buyerId: string): Promise<number> {
    const buyerMoney: number = await userRepository.getDollarsByUser(buyerId);
    const itemData: IItemByIdDomainModel = await itemRepository.getItemById(id);

    if (itemData.userId === parseInt(buyerId)) {
      return Promise.reject({
        message: `you own this item`,
        status: 400,
      });
    }

    if (itemData.price > buyerMoney) {
      return Promise.reject({
        message: `you don't have enough art dollars to buy this item`,
        status: 400,
      });
    }

    const amountOfSoldItem: number = await itemRepository.buyItem(id, buyerId);
    if (amountOfSoldItem > 0) {
      return await itemRepository.takeMoney(buyerId, itemData.price);
    } else {
      return Promise.reject({
        message: `something went wrong`,
        status: 404,
      });
    }
  },

  async deleteItemById(id: string): Promise<number | undefined> {
    return await itemRepository.deleteItemById(id).then((numOfItems) => {
      if (numOfItems === 0) {
        return Promise.reject({
          message: 'This ID does not exist',
          status: 404,
        });
      }
      return numOfItems;
    });
  },

  async updateItem(
    id: string,
    item: IUpdateItemRequestModel
  ): Promise<number | undefined> {
    return await itemRepository.updateItem(id, item).then((numOfItems) => {
      if (numOfItems === 0) {
        return Promise.reject({
          message: 'This ID does not exist',
          status: 404,
        });
      }
      return numOfItems;
    });
  },
};
