import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { createProviderUseCase } from '@shared/useCases/CreateProvider';

import { IShowTransactionProvider } from '../providers/IShowTransactionProvider';
import { BitcoreShowTransactionProvider } from '../providers/implementations/BitcoreShowTransactionProvider';
import { BlockcypherShowTransactionProvider } from '../providers/implementations/BlockcypherShowTransactionProvider';

const providers = [
  BlockcypherShowTransactionProvider,
  BitcoreShowTransactionProvider,
];

export async function instanceShowTransactionProvider(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  if (!container.isRegistered('ShowTransactionProvider')) {
    const instanceObj = providers[Math.floor(Math.random() * providers.length)];

    await createProviderUseCase.execute<IShowTransactionProvider>({
      instanceObj,
      injectionToken: 'ShowTransactionProvider',
    });
  }
  next();
}
