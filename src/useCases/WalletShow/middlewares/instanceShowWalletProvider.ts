import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { IProvidersRepository } from '@repositories/IProvidersRepository';

import { IShowWalletProvider } from '../providers/IShowWalletProvider';
import { BitcoreShowWalletProvider } from '../providers/implementations/BitcoreShowWalletProvider';
import { BlockcypherShowWalletProvider } from '../providers/implementations/BlockcypherShowWalletProvider';

const providersRepository = container.resolve<IProvidersRepository>(
  'ProvidersRepository',
);

const bitcoreWalletShow = container.resolve(BitcoreShowWalletProvider);
const blockcypherWalletShow = container.resolve(BlockcypherShowWalletProvider);

const providers = {
  [blockcypherWalletShow.providerKey]: blockcypherWalletShow,
  [bitcoreWalletShow.providerKey]: bitcoreWalletShow,
};

export async function instanceShowWalletProvider(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  if (!container.isRegistered('ShowWalletProvider')) {
    const providerKeys = Object.keys(providers);

    await providersRepository.subscribe(providerKeys);

    const providerKey = await providersRepository.findLowestCalls(providerKeys);

    container.registerInstance<IShowWalletProvider>(
      'ShowWalletProvider',
      providers[providerKey],
    );
  }
  next();
}
