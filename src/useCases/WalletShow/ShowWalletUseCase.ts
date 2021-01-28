import { injectable, inject } from 'tsyringe';

import { IShowWalletProvider } from './providers/IShowWalletProvider';
import { IShowWalletDTO } from './ShowWalletDTO';

@injectable()
export class ShowWalletUseCase {
  constructor(
    @inject('ShowWalletProvider')
    private showWalletProvider: IShowWalletProvider,
  ) {}

  public async execute(publicAddress: string): Promise<IShowWalletDTO> {
    return this.showWalletProvider.run(publicAddress);
  }
}
