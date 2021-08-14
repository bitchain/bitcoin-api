import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { createProviderUseCase } from '@shared/useCases/ProviderCreate';
import { selectProviderUseCase } from '@shared/useCases/ProviderSelect';

import { ICreateWalletProvider } from '../providers/ICreateWalletProvider';
import { BitcoreCreateWalletProvider } from '../providers/implementations/BitcoreCreateWalletProvider';
import { BlockcypherCreateWalletProvider } from '../providers/implementations/BlockcypherCreateWalletProvider';

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

    await createProviderUseCase.execute(providerKeys);

    const providerKey = await selectProviderUseCase.execute(providerKeys);

    container.registerInstance<ICreateWalletProvider>(
      'CreateWalletProvider',
      providers[providerKey],
    );
  }
  next();
}
