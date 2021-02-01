import { Router } from 'express';

import { createWalletController } from '@useCases/WalletCreate';
import { showWalletController } from '@useCases/WalletShow';

const walletsRouter = Router();

walletsRouter.get('/:publicAddress', showWalletController.handle);
walletsRouter.post('/create', createWalletController.handle);

export { walletsRouter };
