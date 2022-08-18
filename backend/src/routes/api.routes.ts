import express from 'express';
import cors from 'cors';
import { userController } from '../controllers/user-controller';
import requestBodyValidator from '../middlewares/request-body-validator';
import {
  registerRequestKeys,
  addItemRequestKeys,
  loginRequestKeys,
} from '../helpers/request-keys';
import { itemController } from '../controllers/item-controller';
import tokenAuthentication from '../middlewares/token-authentication';

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
  .route('/items')
  .post(requestBodyValidator(addItemRequestKeys, 400), tokenAuthentication());
apiRouter.post('/items', itemController.addItem);

apiRouter.route('/items').get(tokenAuthentication());
apiRouter.get('/items', itemController.listAllItemsOnSale);

export default apiRouter;
