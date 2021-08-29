import { ICreateWalletResponseDTO } from '../CreateWalletDTO';

export interface ICreateWalletProvider {
  execute(): Promise<ICreateWalletResponseDTO>;
}
