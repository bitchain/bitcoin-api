import { Router } from 'express';

import WalletsController from '../controllers/WalletsController';
import WalletHistoryController from '../controllers/WalletHistoryController';

const walletsRouter = Router();

const walletsController = new WalletsController();
const walletHistoryController = new WalletHistoryController();

walletsRouter.get('/:publicAddress', walletsController.show);
walletsRouter.post('/create', walletsController.create);

walletsRouter.get('/:publicAddress/history', walletHistoryController.index);

export default walletsRouter;
