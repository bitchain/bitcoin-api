import { Router } from 'express';

import {
  instanceCreateWalletProvider,
  createWalletController,
} from '@modules/wallets/useCases/WalletCreate';
import {
  instanceShowWalletProvider,
  showWalletController,
} from '@modules/wallets/useCases/WalletShow';

const walletsRouter = Router();

walletsRouter.get(
  '/:address',
  instanceShowWalletProvider,
  showWalletController.handle,
);
walletsRouter.post(
  '/create',
  instanceCreateWalletProvider,
  createWalletController.handle,
);

export { walletsRouter };
