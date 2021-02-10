import { injectable, inject } from 'tsyringe';

import { ValidationError } from '@errors/ValidationError';

import { IProvidersRepository } from '@repositories/IProvidersRepository';

import { validateAddressUseCase } from '@useCases/ValidateAddress';
import { validatePrivateKeyUseCase } from '@useCases/ValidatePrivateKey';

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
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
  ) {}

  public async execute(
    data: ICreateTransactionRequestDTO,
  ): Promise<ICreateTransactionResponseDTO> {
    try {
      const { addressTo, privateKey } = data;

      if (!validateAddressUseCase.execute(addressTo)) {
        throw new ValidationError(`Public Address: ${addressTo} is invalid`);
      }

      if (!validatePrivateKeyUseCase.execute(privateKey)) {
        throw new ValidationError(`Private Key is invalid`);
      }

      const result = await this.createTransactionProvider.execute(data);

      this.providersRepository.registerSuccessfulCall(
        this.createTransactionProvider.providerKey,
      );

      return result;
    } catch (error) {
      if (!(error instanceof ValidationError)) {
        this.providersRepository.registerFailedCall(
          this.createTransactionProvider.providerKey,
        );
      }

      throw error;
    }
  }
}
