import { container } from 'tsyringe';

import { IProvidersRepository } from '@repositories/Providers/IProvidersRepository';

import { ICreateWalletProvider } from './ICreateWalletProvider';
import { BitcoreCreateWalletProvider } from './implementations/BitcoreCreateWalletProvider';
import { BlockcypherCreateWalletProvider } from './implementations/BlockcypherCreateWalletProvider';

const bitcoreWalletCreate = container.resolve(BitcoreCreateWalletProvider);
const blockcypherWalletCreate = container.resolve(
  BlockcypherCreateWalletProvider,
);

const providers = {
  [blockcypherWalletCreate.providerKey]: blockcypherWalletCreate,
  [bitcoreWalletCreate.providerKey]: bitcoreWalletCreate,
};

const providersRepository = container.resolve<IProvidersRepository>(
  'ProvidersRepository',
);

export class ProviderInstance {
  async resolve(): Promise<void> {
    const providerKeys = Object.keys(providers);

    await providersRepository.subscribe(providerKeys);

    const providerKey = await providersRepository.findLowestCalls(providerKeys);

    container.registerInstance<ICreateWalletProvider>(
      'CreateWalletProvider',
      providers[providerKey],
    );
  }
}
