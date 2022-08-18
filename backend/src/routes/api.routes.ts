import express from 'express';
import cors from 'cors';
import { userController } from '../controllers/user-controller';
import requestBodyValidator from '../middlewares/request-body-validator';
import { registerRequestKeys } from '../helpers/request-keys';
import { loginRequestKeys } from '../helpers/request-keys';

const apiRouter = express.Router();
apiRouter.use(cors());
apiRouter.use(express.json());

apiRouter
  .route('/register')
  .post(requestBodyValidator(registerRequestKeys, 400));
apiRouter.post('/register', userController.register);

apiRouter.route('/login').post(requestBodyValidator(loginRequestKeys, 400));
apiRouter.post('/login', userController.login);

export default apiRouter;
