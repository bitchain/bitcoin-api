import { injectable, inject } from 'tsyringe';

import { ValidationError } from '@errors/ValidationError';
import { validAddress } from '@utils/address';

import { updateProviderScoreByInstanceUseCase } from '@shared/useCases/UpdateProviderScoreByInstance';

import { IShowWalletProvider } from './providers/IShowWalletProvider';
import { IShowWalletDTO } from './ShowWalletDTO';

@injectable()
export class ShowWalletUseCase {
  constructor(
    @inject('ShowWalletProvider')
    private showWalletProvider: IShowWalletProvider,
  ) {}

  public async execute(address: string): Promise<IShowWalletDTO> {
    const instance = this.showWalletProvider.constructor.name;

    try {
      if (!validAddress(address)) {
        throw new ValidationError(`Public Address: ${address} is invalid`);
      }

      const result = await this.showWalletProvider.execute(address);

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
