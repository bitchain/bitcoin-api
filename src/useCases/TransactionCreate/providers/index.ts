import { container } from 'tsyringe';

import { IProvidersRepository } from '@repositories/IProvidersRepository';

import { ICreateTransactionProvider } from './ICreateTransactionProvider';
import { BlockcypherCreateTransactionProvider } from './implementations/BlockcypherCreateTransactionProvider';

const blockcypherTransactionCreate = container.resolve(
  BlockcypherCreateTransactionProvider,
);

const providers = {
  [blockcypherTransactionCreate.providerKey]: blockcypherTransactionCreate,
};

const providersRepository = container.resolve<IProvidersRepository>(
  'ProvidersRepository',
);

export class ProviderInstance {
  async resolve(): Promise<void> {
    const providerKeys = Object.keys(providers);

    await providersRepository.subscribe(providerKeys);

    const providerKey = await providersRepository.findLowestCalls(providerKeys);

    container.registerInstance<ICreateTransactionProvider>(
      'CreateTransactionProvider',
      providers[providerKey],
    );
  }
}
