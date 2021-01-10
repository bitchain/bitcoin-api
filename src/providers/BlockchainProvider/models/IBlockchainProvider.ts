import IPublicWalletInfoDTO from '../dtos/IPublicWalletInfoDTO';
import ICreateWalletDTO from '../dtos/ICreateWalletDTO';

export default interface IBlockchainProvider {
  publicWalletInfo(
    publicAddress: string,
  ): Promise<IPublicWalletInfoDTO | undefined>;
  createWallet(): Promise<ICreateWalletDTO | undefined>;
}
