import { Router } from 'express';
import AuthController from './controllers/AuthController';
import TotemController from './controllers/TotemController';
import UserController from './controllers/UserController';
import { authorization } from './middlewares/authorization';

const routes = Router();

routes.get('/users/:id', UserController.show)
routes.post('/users', UserController.create);

routes.post('/auth/login', AuthController.login);
routes.post('/auth/forgot', AuthController.forgotPassword);
routes.post('/auth/recover', AuthController.recoverPassword);
routes.post('/auth/register', AuthController.register);

routes.use(authorization);

routes.get('/totems', TotemController.index);
routes.get('/totems/:id', TotemController.show);
routes.post('/totems', TotemController.create);

export default routes;
