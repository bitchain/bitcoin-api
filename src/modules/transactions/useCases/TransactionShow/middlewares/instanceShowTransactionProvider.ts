import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { selectProviderUseCase } from '@shared/useCases/ProviderSelect';

import { IShowTransactionProvider } from '../providers/IShowTransactionProvider';
import { BitcoreShowTransactionProvider } from '../providers/implementations/BitcoreShowTransactionProvider';
import { BlockcypherShowTransactionProvider } from '../providers/implementations/BlockcypherShowTransactionProvider';

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

    const providerKey = await selectProviderUseCase.execute(providerKeys);

    container.registerInstance<IShowTransactionProvider>(
      'ShowTransactionProvider',
      providers[providerKey],
    );
  }
  next();
}
