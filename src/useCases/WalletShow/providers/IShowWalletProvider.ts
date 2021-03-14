import { IShowWalletDTO } from '../ShowWalletDTO';

export interface IShowWalletProvider {
  providerKey: string;
  execute(address: string): Promise<IShowWalletDTO>;
}
