import { container } from 'tsyringe';

import { IShowWalletProvider } from './providers/IShowWalletProvider';

import { ShowWalletController } from './ShowWalletController';

import { BlockcypherShowWalletProvider } from './providers/implementations/BlockcypherShowWalletProvider';
import { BitcoreShowWalletProvider } from './providers/implementations/BitcoreShowWalletProvider';

const providers = {
  blockcypher: container.resolve(BlockcypherShowWalletProvider),
  bitcore: container.resolve(BitcoreShowWalletProvider),
};

container.registerInstance<IShowWalletProvider>(
  'ShowWalletProvider',
  providers.blockcypher,
);

const showWalletController = new ShowWalletController();

export { showWalletController };
