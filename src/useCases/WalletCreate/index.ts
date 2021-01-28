import { container } from 'tsyringe';

import { ICreateWalletProvider } from './providers/ICreateWalletProvider';

import { CreateWalletController } from './CreateWalletController';

import { BlockcypherCreateWalletProvider } from './providers/implementations/BlockcypherCreateWalletProvider';
import { BitcoreCreateWalletProvider } from './providers/implementations/BitcoreCreateWalletProvider';

const providers = {
  blockcypher: container.resolve(BlockcypherCreateWalletProvider),
  bitcore: container.resolve(BitcoreCreateWalletProvider),
};

container.registerInstance<ICreateWalletProvider>(
  'CreateWalletProvider',
  providers.bitcore,
);

const createWalletController = new CreateWalletController();

export { createWalletController };
