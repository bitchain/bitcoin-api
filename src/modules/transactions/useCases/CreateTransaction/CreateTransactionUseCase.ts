import { injectable, inject } from 'tsyringe';

import { ValidationError } from '@errors/ValidationError';
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
    try {
      const { addressTo, privateKey } = data;

      if (!validAddress(addressTo)) {
        throw new ValidationError(`Public Address: ${addressTo} is invalid`);
      }

      if (!validPrivateKey(privateKey)) {
        throw new ValidationError(`Private Key is invalid`);
      }

      const result = await this.createTransactionProvider.execute(data);

      return result;
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }

      throw error;
    }
  }
}
