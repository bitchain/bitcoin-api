import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { createProviderUseCase } from '@shared/useCases/CreateProvider';

import { ICreateTransactionProvider } from '../providers/ICreateTransactionProvider';

import { BlockcypherCreateTransactionProvider } from '../providers/implementations/BlockcypherCreateTransactionProvider';

const providers = [BlockcypherCreateTransactionProvider];

export async function instanceCreateTransactionProvider(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  if (!container.isRegistered('CreateTransactionProvider')) {
    const instanceObj = providers[Math.floor(Math.random() * providers.length)];

    await createProviderUseCase.execute<ICreateTransactionProvider>({
      instanceObj,
      injectionToken: 'CreateTransactionProvider',
    });
  }
  next();
}
