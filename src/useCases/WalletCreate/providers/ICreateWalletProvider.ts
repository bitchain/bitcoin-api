import { ICreateWalletResponseDTO } from '../CreateWalletDTO';

export interface ICreateWalletProvider {
  run(): Promise<ICreateWalletResponseDTO>;
}
