import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { createProviderUseCase } from '@shared/useCases/ProviderCreate';
import { selectProviderUseCase } from '@shared/useCases/ProviderSelect';

import { ICreateTransactionProvider } from '../providers/ICreateTransactionProvider';
import { BlockcypherCreateTransactionProvider } from '../providers/implementations/BlockcypherCreateTransactionProvider';

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

    await createProviderUseCase.execute(providerKeys);

    const providerKey = await selectProviderUseCase.execute(providerKeys);

    container.registerInstance<ICreateTransactionProvider>(
      'CreateTransactionProvider',
      providers[providerKey],
    );
  }
  next();
}
