import { Router } from 'express';
import { container } from 'tsyringe';

import CreateWalletService from './services/CreateWalletService';
import ShowPublicWalletService from './services/ShowPublicWalletService';

const routes = Router();

routes.get('/create', async (request, response) => {
  const createWalletService = container.resolve(CreateWalletService);

  const wallet = await createWalletService.execute();

  return response.json(wallet);
});

routes.get('/show/:publicAddress', async (request, response) => {
  const showPublicWalletService = container.resolve(ShowPublicWalletService);

  const { publicAddress } = request.params;

  const publicWalletInfo = await showPublicWalletService.execute(publicAddress);

  return response.json(publicWalletInfo);
});

export default routes;
