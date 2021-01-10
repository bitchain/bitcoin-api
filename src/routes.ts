import { Router } from 'express';
import { container } from 'tsyringe';

import CreateWalletService from './services/CreateWalletService';

const routes = Router();

routes.get('/', async (request, response) => {
  const createWalletService = container.resolve(CreateWalletService);

  const teste = await createWalletService.execute();

  return response.json(teste);
});

export default routes;
