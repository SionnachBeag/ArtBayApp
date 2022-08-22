import { NextFunction, Request, Response } from 'express';
import { ApiErrorModel } from '../models/ApiErrorModel';
import { IBuyItemRequestModel } from '../models/request-models/IBuyItemRequestModel';
import { ICreateItemRequestModel } from '../models/request-models/ICreateItemRequestModel';
import { ICreateItemViewModel } from '../models/view-models/ICreateItemViewModel';
import { IItemByIdViewModel } from '../models/view-models/IItemByIdViewModel';
import { IItemsOnSaleViewModel } from '../models/view-models/IItemsOnSaleViewModel';
import { ISuccessViewModel } from '../models/view-models/ISuccessViewModel';
import { imgUrlService } from '../services/img-url-service';
import { itemService } from '../services/item-service';

export const itemController = {
  async addItem(
    req: Request<ICreateItemRequestModel>,
    res: Response<ICreateItemViewModel>,
    next: NextFunction
  ) {
    const newItem: ICreateItemRequestModel = req.body;

    if (newItem.price < 0 || newItem.price % 1 !== 0)
      return next({
        message: 'Incorrect price value.',
        status: 400,
      });

    const isValid = imgUrlService.imgUrlCheck(newItem.imgUrl);
    if (!isValid)
      return next({
        message: 'Incorrect image url.',
        status: 400,
      });

    await itemService
      .addItem(newItem)
      .then((insertId) => {
        return res.json({
          id: insertId,
        });
      })
      .catch((err) => {
        console.log(err);
        next(err);
        return;
      });
  },

  async listAllItemsOnSale(
    _req: Request,
    res: Response<IItemsOnSaleViewModel[]>,
    next: NextFunction
  ) {
    await itemService
      .listAllItemsOnSale()
      .then((data) => {
        const filteredData = data.map((e) => {
          delete e.buyerId;
          return e;
        });
        return res.json(filteredData);
      })
      .catch((err: ApiErrorModel) => {
        console.log(err);
        next(err);
        return;
      });
  },

  async listItemsBought(req: Request, res: Response, next: NextFunction) {
    const { id } = <{ id: string }>req.params;
    await itemService
      .listItemsBought(id)
      .then((data) => {
        return res.json(data);
      })
      .catch((err: ApiErrorModel) => {
        console.log(err);
        next(err);
        return;
      });
  },

  async getItemById(
    req: Request,
    res: Response<IItemByIdViewModel>,
    next: NextFunction
  ) {
    const { id } = <{ id: string }>req.params;
    await itemService
      .getItemById(id)
      .then((data) => {
        return res.json(data);
      })
      .catch((err: ApiErrorModel) => {
        console.log(err);
        next(err);
        return;
      });
  },

  async buyItem(
    req: Request,
    res: Response<ISuccessViewModel>,
    next: NextFunction
  ) {
    const { buyerId }: IBuyItemRequestModel = req.body;
    const { id } = <{ id: string }>req.params;
    await itemService
      .buyItem(id, buyerId)
      .then(() => {
        return res.json({
          status: 200,
          message: 'Item is sold.',
        });
      })
      .catch((err) => {
        console.log(err);
        next(err);
        return;
      });
  },
};
