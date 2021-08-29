import { Router } from 'express';

import {
  instanceCreateWalletProvider,
  createWalletController,
} from '@modules/wallets/useCases/CreateWallet';
import {
  instanceShowWalletProvider,
  showWalletController,
} from '@modules/wallets/useCases/ShowWallet';

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
