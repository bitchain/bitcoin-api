import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { createProviderUseCase } from '@shared/useCases/CreateProvider';

import { ICreateWalletProvider } from '../providers/ICreateWalletProvider';

import { BitcoreCreateWalletProvider } from '../providers/implementations/BitcoreCreateWalletProvider';
import { BlockcypherCreateWalletProvider } from '../providers/implementations/BlockcypherCreateWalletProvider';

const providers = [
  BlockcypherCreateWalletProvider,
  BitcoreCreateWalletProvider,
];

export async function instanceCreateWalletProvider(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  if (!container.isRegistered('CreateWalletProvider')) {
    const instanceObj = providers[Math.floor(Math.random() * providers.length)];

    await createProviderUseCase.execute<ICreateWalletProvider>({
      instanceObj,
      injectionToken: 'CreateWalletProvider',
    });
  }
  next();
}
