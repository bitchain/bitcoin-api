import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { createProviderUseCase } from '@useCases/ProviderCreate';
import { selectProviderUseCase } from '@useCases/ProviderSelect';

import { IShowWalletProvider } from '../providers/IShowWalletProvider';
import { BitcoreShowWalletProvider } from '../providers/implementations/BitcoreShowWalletProvider';
import { BlockcypherShowWalletProvider } from '../providers/implementations/BlockcypherShowWalletProvider';

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

    await createProviderUseCase.execute(providerKeys);

    const providerKey = await selectProviderUseCase.execute(providerKeys);

    container.registerInstance<IShowWalletProvider>(
      'ShowWalletProvider',
      providers[providerKey],
    );
  }
  next();
}
