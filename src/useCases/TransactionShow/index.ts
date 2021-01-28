import { container } from 'tsyringe';

import { IShowTransactionProvider } from './providers/IShowTransactionProvider';

import { ShowTransactionController } from './ShowTransactionController';

import { BlockcypherShowTransactionProvider } from './providers/implementations/BlockcypherShowTransactionProvider';
import { BitcoreShowTransactionProvider } from './providers/implementations/BitcoreShowTransactionProvider';

const providers = {
  bitcore: container.resolve(BitcoreShowTransactionProvider),
  blockcypher: container.resolve(BlockcypherShowTransactionProvider),
};

container.registerInstance<IShowTransactionProvider>(
  'ShowTransactionProvider',
  providers.blockcypher,
);

const showTransactionController = new ShowTransactionController();

export { showTransactionController };
