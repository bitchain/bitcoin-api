import { injectable, inject } from 'tsyringe';

import { HttpError } from '@shared/errors/HttpError';
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
    const { addressFrom, addressTo } = data;

    if (!validAddress(addressFrom)) {
      throw new HttpError(`Public Address: ${addressFrom} is invalid`);
    }

    if (!validAddress(addressTo)) {
      throw new HttpError(`Public Address: ${addressTo} is invalid`);
    }

    const result = await this.showTransactionFeeProvider.execute(data);

    return result;
  }
}
