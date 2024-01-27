import { IShowWalletDTO } from '@modules/wallets/dtos/IShowWalletDTO'

export interface IShowWalletProvider {
  execute(address: string): Promise<IShowWalletDTO>
}
