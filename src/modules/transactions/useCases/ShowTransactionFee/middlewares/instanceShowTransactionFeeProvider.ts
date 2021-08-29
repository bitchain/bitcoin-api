import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { createProviderUseCase } from '@shared/useCases/CreateProvider';

import { IShowTransactionFeeProvider } from '../providers/IShowTransactionFeeProvider';

import { BlockcypherShowTransactionFeeProvider } from '../providers/implementations/BlockcypherShowTransactionFeeProvider';

const providers = [BlockcypherShowTransactionFeeProvider];

export async function instanceShowTransactionFeeProvider(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  if (!container.isRegistered('ShowTransactionFeeProvider')) {
    const instanceObj = providers[Math.floor(Math.random() * providers.length)];

    await createProviderUseCase.execute<IShowTransactionFeeProvider>({
      instanceObj,
      injectionToken: 'ShowTransactionFeeProvider',
    });
  }
  next();
}
