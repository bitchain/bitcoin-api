import { injectable, inject } from 'tsyringe';

import { IProvidersRepository } from '@repositories/Providers/IProvidersRepository';

import { ICreateWalletProvider } from './providers/ICreateWalletProvider';
import { ICreateWalletResponseDTO } from './CreateWalletDTO';

@injectable()
export class CreateWalletUseCase {
  constructor(
    @inject('CreateWalletProvider')
    private createWalletProvider: ICreateWalletProvider,
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
  ) {}

  public async execute(): Promise<ICreateWalletResponseDTO> {
    try {
      const result = await this.createWalletProvider.execute();

      this.providersRepository.registerSuccessfulCall(
        this.createWalletProvider.providerKey,
      );

      return result;
    } catch (error) {
      this.providersRepository.registerFailedCall(
        this.createWalletProvider.providerKey,
      );

      throw error;
    }
  }
}
