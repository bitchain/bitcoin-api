import { CreateWalletController } from './CreateWalletController';

import { instanceCreateWalletProvider } from './middlewares/instanceCreateWalletProvider';

const createWalletController = new CreateWalletController();

export { instanceCreateWalletProvider, createWalletController };
