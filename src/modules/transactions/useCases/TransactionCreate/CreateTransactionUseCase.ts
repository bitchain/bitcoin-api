import { injectable, inject } from 'tsyringe';

import { ValidationError } from '@errors/ValidationError';

import { updateProviderUseCase } from '@shared/useCases/ProviderUpdate';
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
    const { providerKey } = this.createTransactionProvider;

    try {
      const { addressTo, privateKey } = data;

      if (!validateAddressUseCase.execute(addressTo)) {
        throw new ValidationError(`Public Address: ${addressTo} is invalid`);
      }

      if (!validatePrivateKeyUseCase.execute(privateKey)) {
        throw new ValidationError(`Private Key is invalid`);
      }

      const result = await this.createTransactionProvider.execute(data);

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
