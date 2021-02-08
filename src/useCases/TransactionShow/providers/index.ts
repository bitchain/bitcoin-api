import { container } from 'tsyringe';

import { IProvidersRepository } from '@repositories/IProvidersRepository';

import { IShowTransactionProvider } from './IShowTransactionProvider';
import { BitcoreShowTransactionProvider } from './implementations/BitcoreShowTransactionProvider';
import { BlockcypherShowTransactionProvider } from './implementations/BlockcypherShowTransactionProvider';

const bitcoreTransactionShow = container.resolve(
  BitcoreShowTransactionProvider,
);
const blockcypherTransactionShow = container.resolve(
  BlockcypherShowTransactionProvider,
);

const providers = {
  [blockcypherTransactionShow.providerKey]: blockcypherTransactionShow,
  [bitcoreTransactionShow.providerKey]: bitcoreTransactionShow,
};

const providersRepository = container.resolve<IProvidersRepository>(
  'ProvidersRepository',
);

export class ProviderInstance {
  async resolve(): Promise<void> {
    const providerKeys = Object.keys(providers);

    await providersRepository.subscribe(providerKeys);

    const providerKey = await providersRepository.findLowestCalls(providerKeys);

    container.registerInstance<IShowTransactionProvider>(
      'ShowTransactionProvider',
      providers[providerKey],
    );
  }
}
