import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { IProvidersRepository } from '@repositories/IProvidersRepository';

import { ICreateTransactionProvider } from '../providers/ICreateTransactionProvider';
import { BlockcypherCreateTransactionProvider } from '../providers/implementations/BlockcypherCreateTransactionProvider';

const providersRepository = container.resolve<IProvidersRepository>(
  'ProvidersRepository',
);

const blockcypherTransactionCreate = container.resolve(
  BlockcypherCreateTransactionProvider,
);

const providers = {
  [blockcypherTransactionCreate.providerKey]: blockcypherTransactionCreate,
};

export async function instanceCreateTransactionProvider(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  if (!container.isRegistered('CreateTransactionProvider')) {
    const providerKeys = Object.keys(providers);

    await providersRepository.subscribe(providerKeys);

    const providerKey = await providersRepository.findLowestCalls(providerKeys);

    container.registerInstance<ICreateTransactionProvider>(
      'CreateTransactionProvider',
      providers[providerKey],
    );
  }
  next();
}
