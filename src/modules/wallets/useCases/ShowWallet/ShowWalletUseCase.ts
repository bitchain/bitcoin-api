import { injectable, inject } from 'tsyringe'

import { IShowWalletDTO } from '@modules/wallets/dtos/IShowWalletDTO'
import { HttpError } from '@shared/errors/HttpError'
import { IShowWalletProvider } from '@shared/providers/ShowWalletProvider/IShowWalletProvider'
import { validAddress } from '@utils/address'

@injectable()
export class ShowWalletUseCase {
  constructor(
    @inject('ShowWalletProvider')
    private showWalletProvider: IShowWalletProvider,
  ) {}

  public async execute(address: string): Promise<IShowWalletDTO> {
    if (!validAddress(address)) {
      throw new HttpError(`Public Address: ${address} is invalid`)
    }

    const result = await this.showWalletProvider.execute(address)

    return result
  }
}
