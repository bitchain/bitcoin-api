import { container } from 'tsyringe';

import { IProvidersRepository } from '@repositories/IProvidersRepository';

import { IShowTransactionFeeProvider } from './IShowTransactionFeeProvider';
import { BlockcypherShowTransactionFeeProvider } from './implementations/BlockcypherShowTransactionFeeProvider';

const blockcypherTransactionFeeShow = container.resolve(
  BlockcypherShowTransactionFeeProvider,
);

const providers = {
  [blockcypherTransactionFeeShow.providerKey]: blockcypherTransactionFeeShow,
};

const providersRepository = container.resolve<IProvidersRepository>(
  'ProvidersRepository',
);

export class ProviderInstance {
  async resolve(): Promise<void> {
    const providerKeys = Object.keys(providers);

    await providersRepository.subscribe(providerKeys);

    const providerKey = await providersRepository.findLowestCalls(providerKeys);

    container.registerInstance<IShowTransactionFeeProvider>(
      'ShowTransactionFeeProvider',
      providers[providerKey],
    );
  }
}
