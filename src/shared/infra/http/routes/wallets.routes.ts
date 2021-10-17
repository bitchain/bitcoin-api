import { Router } from 'express';

import { createWalletController } from '@modules/wallets/useCases/CreateWallet';
import { showWalletController } from '@modules/wallets/useCases/ShowWallet';

const walletsRouter = Router();

walletsRouter.get('/:address', showWalletController.handle);
walletsRouter.post('/create', createWalletController.handle);

export { walletsRouter };
