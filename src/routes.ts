import { Router } from 'express';
import TotemController from './controllers/TotemController';

const routes = Router();

routes.get('/totems', TotemController.index);
routes.get('/totems/:id', TotemController.show);
routes.post('/totems', TotemController.create);

export default routes;