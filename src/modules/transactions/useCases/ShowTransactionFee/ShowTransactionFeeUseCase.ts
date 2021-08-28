import { injectable, inject } from 'tsyringe';

import { ValidationError } from '@errors/ValidationError';

import { updateProviderScoreByInstanceUseCase } from '@shared/useCases/UpdateProviderScoreByInstance';

import { validateAddressUseCase } from '@modules/wallets/useCases/ValidateAddress';

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
    const instance = this.showTransactionFeeProvider.constructor.name;

    try {
      const { addressFrom, addressTo } = data;

      if (!validateAddressUseCase.execute(addressFrom)) {
        throw new ValidationError(`Public Address: ${addressFrom} is invalid`);
      }

      if (!validateAddressUseCase.execute(addressTo)) {
        throw new ValidationError(`Public Address: ${addressTo} is invalid`);
      }

      const result = await this.showTransactionFeeProvider.execute(data);

      await updateProviderScoreByInstanceUseCase.execute({
        instance,
        score: 1,
      });

      return result;
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }

      await updateProviderScoreByInstanceUseCase.execute({
        instance,
        score: -5,
      });

      throw error;
    }
  }
}
