import { Router } from 'express';

import {
  instanceCreateWalletProvider,
  createWalletController,
} from '@useCases/WalletCreate';
import {
  instanceShowWalletProvider,
  showWalletController,
} from '@useCases/WalletShow';

const walletsRouter = Router();

walletsRouter.get(
  '/:publicAddress',
  instanceShowWalletProvider,
  showWalletController.handle,
);
walletsRouter.post(
  '/create',
  instanceCreateWalletProvider,
  createWalletController.handle,
);

export { walletsRouter };
