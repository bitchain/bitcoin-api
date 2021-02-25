import { injectable, inject } from 'tsyringe';

import { updateProviderUseCase } from '@useCases/ProviderUpdate';

import { ICreateWalletProvider } from './providers/ICreateWalletProvider';
import { ICreateWalletResponseDTO } from './CreateWalletDTO';

@injectable()
export class CreateWalletUseCase {
  constructor(
    @inject('CreateWalletProvider')
    private createWalletProvider: ICreateWalletProvider,
  ) {}

  public async execute(): Promise<ICreateWalletResponseDTO> {
    const { providerKey } = this.createWalletProvider;

    try {
      const result = await this.createWalletProvider.execute();

      updateProviderUseCase.execute({
        providerKey,
        successfulCall: true,
      });

      return result;
    } catch (error) {
      updateProviderUseCase.execute({
        providerKey,
        successfulCall: false,
      });

      throw error;
    }
  }
}
