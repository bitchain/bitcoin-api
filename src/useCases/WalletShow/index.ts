import { ShowWalletController } from './ShowWalletController';

import { ProviderInstance } from './providers';

new ProviderInstance().resolve();

const showWalletController = new ShowWalletController();

export { showWalletController };
