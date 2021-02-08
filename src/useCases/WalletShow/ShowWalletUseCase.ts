import { injectable, inject } from 'tsyringe';

import { IProvidersRepository } from '@repositories/IProvidersRepository';

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
      const result = await this.showWalletProvider.execute(publicAddress);

      this.providersRepository.registerSuccessfulCall(
        this.showWalletProvider.providerKey,
      );

      return result;
    } catch (error) {
      this.providersRepository.registerFailedCall(
        this.showWalletProvider.providerKey,
      );

      throw error;
    }
  }
}
