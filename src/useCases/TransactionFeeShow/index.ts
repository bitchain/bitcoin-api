import { container } from 'tsyringe';

import { IShowTransactionFeeProvider } from './providers/IShowTransactionFeeProvider';

import { ShowTransactionFeeUseCase } from './ShowTransactionFeeUseCase';
import { ShowTransactionFeeController } from './ShowTransactionFeeController';

import { BlockcypherShowTransactionFeeProvider } from './providers/implementations/BlockcypherShowTransactionFeeProvider';

const providers = {
  blockcypher: container.resolve(BlockcypherShowTransactionFeeProvider),
};

container.registerInstance<IShowTransactionFeeProvider>(
  'ShowTransactionFeeProvider',
  providers.blockcypher,
);

const showTransactionFeeUseCase = container.resolve(ShowTransactionFeeUseCase);

const showTransactionFeeController = new ShowTransactionFeeController();

export { showTransactionFeeUseCase, showTransactionFeeController };
