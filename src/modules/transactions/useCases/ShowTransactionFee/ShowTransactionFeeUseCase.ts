import { injectable, inject } from 'tsyringe'

import {
  IShowTransactionFeeRequestDTO,
  IShowTransactionFeeResponseDTO,
} from '@modules/transactions/dtos/IShowTransactionFeeDTO'
import { HttpError } from '@shared/errors/HttpError'
import { IShowTransactionFeeProvider } from '@shared/providers/ShowTransactionFeeProvider/IShowTransactionFeeProvider'
import { validAddress } from '@utils/address'

@injectable()
export class ShowTransactionFeeUseCase {
  constructor(
    @inject('ShowTransactionFeeProvider')
    private showTransactionFeeProvider: IShowTransactionFeeProvider,
  ) {}

  public async execute(
    data: IShowTransactionFeeRequestDTO,
  ): Promise<IShowTransactionFeeResponseDTO> {
    const { addressFrom, addressTo } = data

    if (!validAddress(addressFrom)) {
      throw new HttpError(`Public Address: ${addressFrom} is invalid`)
    }

    if (!validAddress(addressTo)) {
      throw new HttpError(`Public Address: ${addressTo} is invalid`)
    }

    const result = await this.showTransactionFeeProvider.execute(data)

    return result
  }
}
