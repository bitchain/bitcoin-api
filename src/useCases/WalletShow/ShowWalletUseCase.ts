import { injectable, inject } from 'tsyringe';

import { ValidationError } from '@errors/ValidationError';

import { updateProviderUseCase } from '@useCases/ProviderUpdate';
import { validateAddressUseCase } from '@useCases/ValidateAddress';

import { IShowWalletProvider } from './providers/IShowWalletProvider';
import { IShowWalletDTO } from './ShowWalletDTO';

@injectable()
export class ShowWalletUseCase {
  constructor(
    @inject('ShowWalletProvider')
    private showWalletProvider: IShowWalletProvider,
  ) {}

  public async execute(publicAddress: string): Promise<IShowWalletDTO> {
    const { providerKey } = this.showWalletProvider;

    try {
      if (!validateAddressUseCase.execute(publicAddress)) {
        throw new ValidationError(
          `Public Address: ${publicAddress} is invalid`,
        );
      }

      const result = await this.showWalletProvider.execute(publicAddress);

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
