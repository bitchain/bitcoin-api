import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { IProvidersRepository } from '@repositories/IProvidersRepository';

import { IShowTransactionFeeProvider } from '../providers/IShowTransactionFeeProvider';
import { BlockcypherShowTransactionFeeProvider } from '../providers/implementations/BlockcypherShowTransactionFeeProvider';

const providersRepository = container.resolve<IProvidersRepository>(
  'ProvidersRepository',
);

const blockcypherTransactionFeeShow = container.resolve(
  BlockcypherShowTransactionFeeProvider,
);

const providers = {
  [blockcypherTransactionFeeShow.providerKey]: blockcypherTransactionFeeShow,
};

export async function instanceShowTransactionFeeProvider(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  if (!container.isRegistered('ShowTransactionFeeProvider')) {
    const providerKeys = Object.keys(providers);

    await providersRepository.subscribe(providerKeys);

    const providerKey = await providersRepository.findLowestCalls(providerKeys);

    container.registerInstance<IShowTransactionFeeProvider>(
      'ShowTransactionFeeProvider',
      providers[providerKey],
    );
  }
  next();
}
