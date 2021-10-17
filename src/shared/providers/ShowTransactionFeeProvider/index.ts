import { container } from 'tsyringe';

import IDependencyProvider from '../IDependencyProvider';
import { BlockcypherShowTransactionFeeProvider } from './implementations/BlockcypherShowTransactionFeeProvider';

const providers = [BlockcypherShowTransactionFeeProvider];

export default class ShowTransactionFeeProvider implements IDependencyProvider {
  resolve(useCase: any): any {
    if (!container.isRegistered('ShowTransactionFeeProvider')) {
      const provider = providers[Math.floor(Math.random() * providers.length)];

      const instance = container.resolve(provider);
      container.registerInstance('ShowTransactionFeeProvider', instance);
    }

    const showTransactionFee = container.resolve(useCase);

    return showTransactionFee;
  }
}
