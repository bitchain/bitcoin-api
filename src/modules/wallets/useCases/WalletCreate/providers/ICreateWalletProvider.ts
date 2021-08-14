import { ICreateWalletResponseDTO } from '../CreateWalletDTO';

export interface ICreateWalletProvider {
  providerKey: string;
  execute(): Promise<ICreateWalletResponseDTO>;
}
