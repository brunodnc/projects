import { Router } from 'express';
import LoginController from '../controllers/LoginController';

const loginRouter = Router();

const controller: LoginController = new LoginController();

loginRouter.post('/', controller.login.bind(controller));
loginRouter.get('/validate', controller.validate.bind(controller));

export default loginRouter;
