import { injectable, inject } from 'tsyringe';

import { IShowWalletProvider } from '@shared/providers/ShowWalletProvider/IShowWalletProvider';
import { IShowWalletDTO } from '@modules/wallets/dtos/IShowWalletDTO';

import { ValidationError } from '@errors/ValidationError';
import { validAddress } from '@utils/address';

@injectable()
export class ShowWalletUseCase {
  constructor(
    @inject('ShowWalletProvider')
    private showWalletProvider: IShowWalletProvider,
  ) {}

  public async execute(address: string): Promise<IShowWalletDTO> {
    try {
      if (!validAddress(address)) {
        throw new ValidationError(`Public Address: ${address} is invalid`);
      }

      const result = await this.showWalletProvider.execute(address);

      return result;
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }

      throw error;
    }
  }
}
