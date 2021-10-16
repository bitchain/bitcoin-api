import { injectable, inject } from 'tsyringe';

import { ICreateWalletProvider } from '@shared/providers/CreateWalletProvider/ICreateWalletProvider';

import { ICreateWalletDTO } from '@modules/wallets/dtos/ICreateWalletDTO';

@injectable()
export class CreateWalletUseCase {
  constructor(
    @inject('CreateWalletProvider')
    private createWalletProvider: ICreateWalletProvider,
  ) {}

  public async execute(): Promise<ICreateWalletDTO> {
    const result = await this.createWalletProvider.execute();

    return result;
  }
}
