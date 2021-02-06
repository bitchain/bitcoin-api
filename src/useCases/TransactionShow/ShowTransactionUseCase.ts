import { injectable, inject } from 'tsyringe';

import { IProvidersRepository } from '@repositories/Providers/IProvidersRepository';

import { IShowTransactionProvider } from './providers/IShowTransactionProvider';
import { IShowTransactionDTO } from './ShowTransactionDTO';

@injectable()
export class ShowTransactionUseCase {
  constructor(
    @inject('ShowTransactionProvider')
    private showTransactionProvider: IShowTransactionProvider,
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
  ) {}

  public async execute(publicId: string): Promise<IShowTransactionDTO> {
    try {
      const result = await this.showTransactionProvider.execute(publicId);

      this.providersRepository.registerSuccessfulCall(
        this.showTransactionProvider.providerKey,
      );

      return result;
    } catch (error) {
      this.providersRepository.registerFailedCall(
        this.showTransactionProvider.providerKey,
      );

      throw error;
    }
  }
}
