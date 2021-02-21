import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { IProvidersRepository } from '@repositories/IProvidersRepository';

import { IShowTransactionProvider } from '../providers/IShowTransactionProvider';
import { BitcoreShowTransactionProvider } from '../providers/implementations/BitcoreShowTransactionProvider';
import { BlockcypherShowTransactionProvider } from '../providers/implementations/BlockcypherShowTransactionProvider';

const providersRepository = container.resolve<IProvidersRepository>(
  'ProvidersRepository',
);

const bitcoreTransactionShow = container.resolve(
  BitcoreShowTransactionProvider,
);
const blockcypherTransactionShow = container.resolve(
  BlockcypherShowTransactionProvider,
);

const providers = {
  [blockcypherTransactionShow.providerKey]: blockcypherTransactionShow,
  [bitcoreTransactionShow.providerKey]: bitcoreTransactionShow,
};

export async function instanceShowTransactionProvider(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  if (!container.isRegistered('ShowTransactionProvider')) {
    const providerKeys = Object.keys(providers);

    await providersRepository.subscribe(providerKeys);

    const providerKey = await providersRepository.findLowestCalls(providerKeys);

    container.registerInstance<IShowTransactionProvider>(
      'ShowTransactionProvider',
      providers[providerKey],
    );
  }
  next();
}
