import { injectable, inject } from 'tsyringe';

import { ValidationError } from '@errors/ValidationError';
import { validAddress } from '@utils/address';

import { IShowTransactionFeeProvider } from '@shared/providers/ShowTransactionFeeProvider/IShowTransactionFeeProvider';
import {
  IShowTransactionFeeRequestDTO,
  IShowTransactionFeeResponseDTO,
} from '@modules/transactions/dtos/IShowTransactionFeeDTO';

@injectable()
export class ShowTransactionFeeUseCase {
  constructor(
    @inject('ShowTransactionFeeProvider')
    private showTransactionFeeProvider: IShowTransactionFeeProvider,
  ) {}

  public async execute(
    data: IShowTransactionFeeRequestDTO,
  ): Promise<IShowTransactionFeeResponseDTO> {
    try {
      const { addressFrom, addressTo } = data;

      if (!validAddress(addressFrom)) {
        throw new ValidationError(`Public Address: ${addressFrom} is invalid`);
      }

      if (!validAddress(addressTo)) {
        throw new ValidationError(`Public Address: ${addressTo} is invalid`);
      }

      const result = await this.showTransactionFeeProvider.execute(data);

      return result;
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }

      throw error;
    }
  }
}
