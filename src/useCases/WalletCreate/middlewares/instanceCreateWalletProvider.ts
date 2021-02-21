import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { IProvidersRepository } from '@repositories/IProvidersRepository';

import { ICreateWalletProvider } from '../providers/ICreateWalletProvider';
import { BitcoreCreateWalletProvider } from '../providers/implementations/BitcoreCreateWalletProvider';
import { BlockcypherCreateWalletProvider } from '../providers/implementations/BlockcypherCreateWalletProvider';

const providersRepository = container.resolve<IProvidersRepository>(
  'ProvidersRepository',
);

const bitcoreWalletCreate = container.resolve(BitcoreCreateWalletProvider);
const blockcypherWalletCreate = container.resolve(
  BlockcypherCreateWalletProvider,
);

const providers = {
  [blockcypherWalletCreate.providerKey]: blockcypherWalletCreate,
  [bitcoreWalletCreate.providerKey]: bitcoreWalletCreate,
};

export async function instanceCreateWalletProvider(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  if (!container.isRegistered('CreateWalletProvider')) {
    const providerKeys = Object.keys(providers);

    await providersRepository.subscribe(providerKeys);

    const providerKey = await providersRepository.findLowestCalls(providerKeys);

    container.registerInstance<ICreateWalletProvider>(
      'CreateWalletProvider',
      providers[providerKey],
    );
  }
  next();
}
