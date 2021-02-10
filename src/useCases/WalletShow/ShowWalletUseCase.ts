import { injectable, inject } from 'tsyringe';

import { ValidationError } from '@errors/ValidationError';

import { IProvidersRepository } from '@repositories/IProvidersRepository';
import { validateAddressUseCase } from '@useCases/ValidateAddress';

import { IShowWalletProvider } from './providers/IShowWalletProvider';
import { IShowWalletDTO } from './ShowWalletDTO';

@injectable()
export class ShowWalletUseCase {
  constructor(
    @inject('ShowWalletProvider')
    private showWalletProvider: IShowWalletProvider,
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
  ) {}

  public async execute(publicAddress: string): Promise<IShowWalletDTO> {
    try {
      if (!validateAddressUseCase.execute(publicAddress)) {
        throw new ValidationError('Public Address is invalid');
      }

      const result = await this.showWalletProvider.execute(publicAddress);

      this.providersRepository.registerSuccessfulCall(
        this.showWalletProvider.providerKey,
      );

      return result;
    } catch (error) {
      if (!(error instanceof ValidationError)) {
        this.providersRepository.registerFailedCall(
          this.showWalletProvider.providerKey,
        );
      }

      throw error;
    }
  }
}
