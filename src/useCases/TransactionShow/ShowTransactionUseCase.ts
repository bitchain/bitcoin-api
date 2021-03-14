import { injectable, inject } from 'tsyringe';

import { updateProviderUseCase } from '@useCases/ProviderUpdate';

import { IShowTransactionProvider } from './providers/IShowTransactionProvider';
import { IShowTransactionDTO } from './ShowTransactionDTO';

@injectable()
export class ShowTransactionUseCase {
  constructor(
    @inject('ShowTransactionProvider')
    private showTransactionProvider: IShowTransactionProvider,
  ) {}

  public async execute(id: string): Promise<IShowTransactionDTO> {
    const { providerKey } = this.showTransactionProvider;

    try {
      const result = await this.showTransactionProvider.execute(id);

      updateProviderUseCase.execute({
        providerKey,
        successfulCall: true,
      });

      return result;
    } catch (error) {
      updateProviderUseCase.execute({
        providerKey,
        successfulCall: false,
      });

      throw error;
    }
  }
}
