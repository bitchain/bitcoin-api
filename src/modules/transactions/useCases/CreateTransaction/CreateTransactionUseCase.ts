import { injectable, inject } from 'tsyringe';

import { ValidationError } from '@errors/ValidationError';

import { updateProviderScoreByInstanceUseCase } from '@shared/useCases/UpdateProviderScoreByInstance';
import { validateAddressUseCase } from '@modules/wallets/useCases/ValidateAddress';
import { validatePrivateKeyUseCase } from '@modules/wallets/useCases/ValidatePrivateKey';

import { ICreateTransactionProvider } from './providers/ICreateTransactionProvider';
import {
  ICreateTransactionRequestDTO,
  ICreateTransactionResponseDTO,
} from './CreateTransactionDTO';

@injectable()
export class CreateTransactionUseCase {
  constructor(
    @inject('CreateTransactionProvider')
    private createTransactionProvider: ICreateTransactionProvider,
  ) {}

  public async execute(
    data: ICreateTransactionRequestDTO,
  ): Promise<ICreateTransactionResponseDTO> {
    const instance = this.createTransactionProvider.constructor.name;

    try {
      const { addressTo, privateKey } = data;

      if (!validateAddressUseCase.execute(addressTo)) {
        throw new ValidationError(`Public Address: ${addressTo} is invalid`);
      }

      if (!validatePrivateKeyUseCase.execute(privateKey)) {
        throw new ValidationError(`Private Key is invalid`);
      }

      const result = await this.createTransactionProvider.execute(data);

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
