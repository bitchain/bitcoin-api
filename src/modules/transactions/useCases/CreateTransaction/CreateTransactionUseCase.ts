import { injectable, inject } from 'tsyringe';

import { HttpError } from '@shared/errors/HttpError';
import { validAddress } from '@utils/address';
import { validPrivateKey } from '@utils/privateKey';

import { ICreateTransactionProvider } from '@shared/providers/CreateTransactionProvider/ICreateTransactionProvider';
import {
  ICreateTransactionRequestDTO,
  ICreateTransactionResponseDTO,
} from '@modules/transactions/dtos/ICreateTransactionDTO';

@injectable()
export class CreateTransactionUseCase {
  constructor(
    @inject('CreateTransactionProvider')
    private createTransactionProvider: ICreateTransactionProvider,
  ) {}

  public async execute(
    data: ICreateTransactionRequestDTO,
  ): Promise<ICreateTransactionResponseDTO> {
    const { addressTo, privateKey } = data;

    if (!validAddress(addressTo)) {
      throw new HttpError(`Public Address: ${addressTo} is invalid`);
    }

    if (!validPrivateKey(privateKey)) {
      throw new HttpError(`Private Key is invalid`);
    }

    const result = await this.createTransactionProvider.execute(data);

    return result;
  }
}
