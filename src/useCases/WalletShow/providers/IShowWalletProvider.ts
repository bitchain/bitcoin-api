import { IShowWalletDTO } from '../ShowWalletDTO';

export interface IShowWalletProvider {
  providerKey: string;
  execute(publicAddress: string): Promise<IShowWalletDTO>;
}
