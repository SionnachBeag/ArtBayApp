import { NextFunction, Request, Response } from 'express';
import { ApiErrorModel } from '../models/ApiErrorModel';
import { ICreateItemRequestModel } from '../models/request-models/ICreateItemRequestModel';
import { ICreateItemViewModel } from '../models/view-models/ICreateItemViewModel';
import { IItemsOnSaleViewModel } from '../models/view-models/IItemsOnSaleViewModel';
import { itemService } from '../services/item-service';

export const itemController = {
  async addItem(
    req: Request<ICreateItemRequestModel>,
    res: Response<ICreateItemViewModel>,
    next: NextFunction
  ) {
    const newItem: ICreateItemRequestModel = req.body;
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
        return res.json(data);
      })
      .catch((err: ApiErrorModel) => {
        console.log(err);
        next(err);
        return;
      });
  },
};
