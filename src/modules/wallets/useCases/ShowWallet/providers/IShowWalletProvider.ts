import { IShowWalletDTO } from '../ShowWalletDTO';

export interface IShowWalletProvider {
  execute(address: string): Promise<IShowWalletDTO>;
}
