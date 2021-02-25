import { injectable, inject } from 'tsyringe';

import { ValidationError } from '@errors/ValidationError';

import { updateProviderUseCase } from '@useCases/ProviderUpdate';
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
  ) {}

  public async execute(
    data: IShowTransactionFeeRequestDTO,
  ): Promise<IShowTransactionFeeResponseDTO> {
    const { providerKey } = this.showTransactionFeeProvider;

    try {
      const { addressFrom, addressTo } = data;

      if (!validateAddressUseCase.execute(addressFrom)) {
        throw new ValidationError(`Public Address: ${addressFrom} is invalid`);
      }

      if (!validateAddressUseCase.execute(addressTo)) {
        throw new ValidationError(`Public Address: ${addressTo} is invalid`);
      }

      const result = await this.showTransactionFeeProvider.execute(data);

      updateProviderUseCase.execute({
        providerKey,
        successfulCall: true,
      });

      return result;
    } catch (error) {
      if (!(error instanceof ValidationError)) {
        updateProviderUseCase.execute({
          providerKey,
          successfulCall: false,
        });
      }

      throw error;
    }
  }
}
