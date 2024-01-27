import { injectable, inject } from 'tsyringe'

import { ICreateWalletDTO } from '@modules/wallets/dtos/ICreateWalletDTO'
import { ICreateWalletProvider } from '@shared/providers/CreateWalletProvider/ICreateWalletProvider'

@injectable()
export class CreateWalletUseCase {
  constructor(
    @inject('CreateWalletProvider')
    private createWalletProvider: ICreateWalletProvider,
  ) {}

  public async execute(): Promise<ICreateWalletDTO> {
    const result = await this.createWalletProvider.execute()

    return result
  }
}
