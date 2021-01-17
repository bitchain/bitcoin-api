import { Router } from 'express';
import { container } from 'tsyringe';

import CreateWalletService from './services/CreateWalletService';
import ShowWalletBalanceService from './services/ShowWalletBalanceService';

const routes = Router();

routes.get('/create', async (request, response) => {
  const createWalletService = container.resolve(CreateWalletService);

  const wallet = await createWalletService.execute();

  return response.json(wallet);
});

routes.get('/show/:publicAddress', async (request, response) => {
  const showWalletBalanceService = container.resolve(ShowWalletBalanceService);

  const { publicAddress } = request.params;

  const walletBalance = await showWalletBalanceService.execute(publicAddress);

  return response.json(walletBalance);
});

export default routes;
