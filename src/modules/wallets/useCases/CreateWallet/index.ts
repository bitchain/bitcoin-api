import { resolveCreateWalletProvider } from '@shared/providers/CreateWalletProvider';
import { CreateWalletController } from './CreateWalletController';

const createWalletController = new CreateWalletController();

export { createWalletController, resolveCreateWalletProvider };
