import { injectable, inject } from 'tsyringe';

import { IProvidersRepository } from '@repositories/IProvidersRepository';

import { IShowTransactionFeeProvider } from './providers/IShowTransactionFeeProvider';
import {
  IShowTransactionFeeRequestDTO,
  IShowTransactionFeeResponseDTO,
} from './ShowTransactionFeeDTO';

@injectable()
export class ShowTransactionFeeUseCase {
  constructor(
    @inject('ShowTransactionFeeProvider')
    private showTransactionFeeProvider: IShowTransactionFeeProvider,
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
  ) {}

  public async execute(
    data: IShowTransactionFeeRequestDTO,
  ): Promise<IShowTransactionFeeResponseDTO> {
    try {
      const result = await this.showTransactionFeeProvider.execute(data);

      this.providersRepository.registerSuccessfulCall(
        this.showTransactionFeeProvider.providerKey,
      );

      return result;
    } catch (error) {
      this.providersRepository.registerFailedCall(
        this.showTransactionFeeProvider.providerKey,
      );

      throw error;
    }
  }
}
