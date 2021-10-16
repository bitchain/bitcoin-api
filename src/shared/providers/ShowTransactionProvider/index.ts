import { container } from 'tsyringe';

import IDependencyProvider from '../IDependencyProvider';

import { BlockcypherShowTransactionProvider } from './implementations/BlockcypherShowTransactionProvider';
import { BitcoreShowTransactionProvider } from './implementations/BitcoreShowTransactionProvider';

const providers = [
  BlockcypherShowTransactionProvider,
  BitcoreShowTransactionProvider,
];

export default class ShowTransactionProvider implements IDependencyProvider {
  resolve(useCase: any): any {
    if (!container.isRegistered('ShowTransactionProvider')) {
      const provider = providers[Math.floor(Math.random() * providers.length)];

      const instance = container.resolve(provider);
      container.registerInstance('ShowTransactionProvider', instance);
    }

    const showTransaction = container.resolve(useCase);

    return showTransaction;
  }
}
