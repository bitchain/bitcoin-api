import { ICreateWalletDTO } from '@modules/wallets/dtos/ICreateWalletDTO'

export interface ICreateWalletProvider {
  execute(): Promise<ICreateWalletDTO>
}
