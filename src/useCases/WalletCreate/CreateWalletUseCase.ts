import { injectable, inject } from 'tsyringe';

import { ICreateWalletProvider } from './providers/ICreateWalletProvider';
import { ICreateWalletResponseDTO } from './CreateWalletDTO';

@injectable()
export class CreateWalletUseCase {
  constructor(
    @inject('CreateWalletProvider')
    private createWalletProvider: ICreateWalletProvider,
  ) {}

  public async execute(): Promise<ICreateWalletResponseDTO> {
    return this.createWalletProvider.run();
  }
}
