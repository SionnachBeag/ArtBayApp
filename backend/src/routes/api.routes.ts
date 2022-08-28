import express from 'express';
import cors from 'cors';
import { userController } from '../controllers/user-controller';
import requestBodyValidator from '../middlewares/request-body-validator';
import {
  registerRequestKeys,
  addItemRequestKeys,
  loginRequestKeys,
  idParamKey,
  buyItemRequestKey,
  updateItemRequestKeys,
} from '../helpers/request-keys';
import { itemController } from '../controllers/item-controller';
import tokenAuthentication from '../middlewares/token-authentication';
import requestParamValidator from '../middlewares/request-param-validator';

const apiRouter = express.Router();
apiRouter.use(cors());
apiRouter.use(express.json());

apiRouter
  .route('/register')
  .post(requestBodyValidator(registerRequestKeys, 400));
apiRouter.post('/register', userController.register);

apiRouter.route('/login').post(requestBodyValidator(loginRequestKeys, 400));
apiRouter.post('/login', userController.login);

apiRouter
  .route('/users/:id')
  .get(requestParamValidator(idParamKey, 400), tokenAuthentication());
apiRouter.get('/users/:id', userController.getDollarsByUser);

apiRouter
  .route('/items')
  .post(requestBodyValidator(addItemRequestKeys, 400), tokenAuthentication());
apiRouter.post('/items', itemController.addItem);

apiRouter.route('/items').get(tokenAuthentication());
apiRouter.get('/items', itemController.listAllItemsOnSale);

apiRouter
  .route('/myItems/:id')
  .get(requestParamValidator(idParamKey, 400), tokenAuthentication());
apiRouter.get('/myItems/:id', itemController.listItemsBought);

apiRouter
  .route('/itemsByUser/:id')
  .get(requestParamValidator(idParamKey, 400), tokenAuthentication());
apiRouter.get('/itemsByUser/:id', itemController.listItemsByUser);

apiRouter
  .route('/items/:id')
  .get(requestParamValidator(idParamKey, 400), tokenAuthentication());
apiRouter.get('/items/:id', itemController.getItemById);

apiRouter
  .route('/buyItem/:id')
  .put(
    requestParamValidator(idParamKey, 400),
    requestBodyValidator(buyItemRequestKey, 400),
    tokenAuthentication()
  );
apiRouter.put('/buyItem/:id', itemController.buyItem);

apiRouter
  .route('/items/:id')
  .put(
    requestParamValidator(idParamKey, 400),
    requestBodyValidator(updateItemRequestKeys, 400),
    tokenAuthentication()
  );
apiRouter.put('/items/:id', itemController.updateItem);

apiRouter
  .route('/items/:id')
  .delete(requestParamValidator(idParamKey, 400), tokenAuthentication());
apiRouter.delete('/items/:id', itemController.deleteItemById);

export default apiRouter;
