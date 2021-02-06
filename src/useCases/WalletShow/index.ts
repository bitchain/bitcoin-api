import { ShowWalletController } from './ShowWalletController';

import { ProviderInstance } from './providers';

const providerInstance = new ProviderInstance();
providerInstance.resolve();

const showWalletController = new ShowWalletController();

export { showWalletController };
