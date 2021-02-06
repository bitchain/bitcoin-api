import { CreateWalletController } from './CreateWalletController';

import { ProviderInstance } from './providers';

new ProviderInstance().resolve();

const createWalletController = new CreateWalletController();

export { createWalletController };
