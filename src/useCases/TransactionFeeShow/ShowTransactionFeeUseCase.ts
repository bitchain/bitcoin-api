import { injectable, inject } from 'tsyringe';

import { ValidationError } from '@errors/ValidationError';

import { IProvidersRepository } from '@repositories/IProvidersRepository';
import { validateAddressUseCase } from '@useCases/ValidateAddress';

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
      const { addressFrom, addressTo } = data;

      if (!validateAddressUseCase.execute(addressFrom)) {
        throw new ValidationError(`Public Address: ${addressFrom} is invalid`);
      }

      if (!validateAddressUseCase.execute(addressTo)) {
        throw new ValidationError(`Public Address: ${addressTo} is invalid`);
      }

      const result = await this.showTransactionFeeProvider.execute(data);

      this.providersRepository.registerSuccessfulCall(
        this.showTransactionFeeProvider.providerKey,
      );

      return result;
    } catch (error) {
      if (!(error instanceof ValidationError)) {
        this.providersRepository.registerFailedCall(
          this.showTransactionFeeProvider.providerKey,
        );
      }

      throw error;
    }
  }
}
