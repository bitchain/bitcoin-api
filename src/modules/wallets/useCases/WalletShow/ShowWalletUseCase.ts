import { injectable, inject } from 'tsyringe';

import { ValidationError } from '@errors/ValidationError';

import { updateProviderUseCase } from '@shared/useCases/ProviderUpdate';

import { validateAddressUseCase } from '../ValidateAddress';
import { IShowWalletProvider } from './providers/IShowWalletProvider';
import { IShowWalletDTO } from './ShowWalletDTO';

@injectable()
export class ShowWalletUseCase {
  constructor(
    @inject('ShowWalletProvider')
    private showWalletProvider: IShowWalletProvider,
  ) {}

  public async execute(address: string): Promise<IShowWalletDTO> {
    const { providerKey } = this.showWalletProvider;

    try {
      if (!validateAddressUseCase.execute(address)) {
        throw new ValidationError(`Public Address: ${address} is invalid`);
      }

      const result = await this.showWalletProvider.execute(address);

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
