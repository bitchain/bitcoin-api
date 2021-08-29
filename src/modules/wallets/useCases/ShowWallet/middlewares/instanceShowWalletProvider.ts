import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { createProviderUseCase } from '@shared/useCases/CreateProvider';

import { IShowWalletProvider } from '../providers/IShowWalletProvider';

import { BlockcypherShowWalletProvider } from '../providers/implementations/BlockcypherShowWalletProvider';
import { BitcoreShowWalletProvider } from '../providers/implementations/BitcoreShowWalletProvider';

const providers = [BlockcypherShowWalletProvider, BitcoreShowWalletProvider];

export async function instanceShowWalletProvider(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  if (!container.isRegistered('ShowWalletProvider')) {
    const instanceObj = providers[Math.floor(Math.random() * providers.length)];

    await createProviderUseCase.execute<IShowWalletProvider>({
      instanceObj,
      injectionToken: 'ShowWalletProvider',
    });
  }
  next();
}
