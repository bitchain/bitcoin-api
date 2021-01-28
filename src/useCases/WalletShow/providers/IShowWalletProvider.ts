import { IShowWalletDTO } from '../ShowWalletDTO';

export interface IShowWalletProvider {
  run(publicAddress: string): Promise<IShowWalletDTO>;
}
