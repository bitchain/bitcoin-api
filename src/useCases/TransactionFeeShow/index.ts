import { container } from 'tsyringe';

import { IShowTransactionFeeProvider } from './providers/IShowTransactionFeeProvider';

import { ShowTransactionFeeController } from './ShowTransactionFeeController';

import { BlockcypherShowTransactionFeeProvider } from './providers/implementations/BlockcypherShowTransactionFeeProvider';

const providers = {
  blockcypher: container.resolve(BlockcypherShowTransactionFeeProvider),
};

container.registerInstance<IShowTransactionFeeProvider>(
  'ShowTransactionFeeProvider',
  providers.blockcypher,
);

const showTransactionFeeController = new ShowTransactionFeeController();

export { showTransactionFeeController };
