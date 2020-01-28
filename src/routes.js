import { Router } from 'express';
import cors from 'cors';

import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';
import CardController from './app/controllers/CardController';

import authMiddleware from './app/middlewares/auth';
import checkCard from './app/middlewares/checkCard';

const routes = Router();

routes.use(cors());
routes.get('/', (req, res) => res.json('API-SCRAPBOOKKK-STRUTURE'));
routes.post('/users', UserController.store);
// Teste Update Senha Projeto RJ
routes.put('/users/:id', UserController.update);
routes.post('/login', AuthController.store);

routes.use(authMiddleware);

routes.get('/test', (req, res) => res.json('Authenticaded'));
routes.get('/cards', CardController.index);
routes.get('/cards/:id', checkCard, CardController.show);
routes.post('/cards', CardController.store);
routes.put('/cards/:id', checkCard, CardController.update);
routes.delete('/cards/:id', checkCard, CardController.delete);

export default routes;
