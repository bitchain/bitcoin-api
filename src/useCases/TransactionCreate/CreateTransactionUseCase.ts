import { injectable, inject } from 'tsyringe';

import { IProvidersRepository } from '@repositories/IProvidersRepository';

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
      const result = await this.createTransactionProvider.execute(data);

      this.providersRepository.registerSuccessfulCall(
        this.createTransactionProvider.providerKey,
      );

      return result;
    } catch (error) {
      this.providersRepository.registerFailedCall(
        this.createTransactionProvider.providerKey,
      );

      throw error;
    }
  }
}
