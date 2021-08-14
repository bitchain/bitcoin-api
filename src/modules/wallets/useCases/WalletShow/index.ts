import { ShowWalletController } from './ShowWalletController';

import { instanceShowWalletProvider } from './middlewares/instanceShowWalletProvider';

const showWalletController = new ShowWalletController();

export { instanceShowWalletProvider, showWalletController };
