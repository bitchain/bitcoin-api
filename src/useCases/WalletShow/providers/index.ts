import { container } from 'tsyringe';

import { IProvidersRepository } from '@repositories/Providers/IProvidersRepository';

import { IShowWalletProvider } from './IShowWalletProvider';
import { BitcoreShowWalletProvider } from './implementations/BitcoreShowWalletProvider';
import { BlockcypherShowWalletProvider } from './implementations/BlockcypherShowWalletProvider';

const bitcoreWalletShow = container.resolve(BitcoreShowWalletProvider);
const blockcypherWalletShow = container.resolve(BlockcypherShowWalletProvider);

const providers = {
  [blockcypherWalletShow.providerKey]: blockcypherWalletShow,
  [bitcoreWalletShow.providerKey]: bitcoreWalletShow,
};

const providersRepository = container.resolve<IProvidersRepository>(
  'ProvidersRepository',
);

export class ProviderInstance {
  async resolve(): Promise<void> {
    const providerKeys = Object.keys(providers);

    await providersRepository.subscribe(providerKeys);

    const providerKey = await providersRepository.findLowestCalls(providerKeys);

    container.registerInstance<IShowWalletProvider>(
      'ShowWalletProvider',
      providers[providerKey],
    );
  }
}
