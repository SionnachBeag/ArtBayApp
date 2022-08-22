import { IBuyerDomainModel } from '../models/domain-models/IBuyerDomainModel';
import { IItemByIdDomainModel } from '../models/domain-models/IItemByIdDomainModel';
import { IItemDomainModel } from '../models/domain-models/IItemDomainModel';
import { IItemAndBuyerModel } from '../models/IItemAndBuyerModel';
import { ICreateItemRequestModel } from '../models/request-models/ICreateItemRequestModel';
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
    if (itemData.price > buyerMoney) {
      return Promise.reject({
        message: `not enough money to buy this item`,
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
};
