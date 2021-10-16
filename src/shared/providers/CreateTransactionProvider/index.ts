import { container } from 'tsyringe';

import IDependencyProvider from '../IDependencyProvider';

import { BlockcypherCreateTransactionProvider } from './implementations/BlockcypherCreateTransactionProvider';

const providers = [BlockcypherCreateTransactionProvider];

export default class CreateTransactionProvider implements IDependencyProvider {
  resolve(useCase: any): any {
    if (!container.isRegistered('CreateTransactionProvider')) {
      const provider = providers[Math.floor(Math.random() * providers.length)];

      const instance = container.resolve(provider);
      container.registerInstance('CreateTransactionProvider', instance);
    }

    const createTransaction = container.resolve(useCase);

    return createTransaction;
  }
}
