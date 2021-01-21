import IWalletBalanceDTO from '../dtos/IWalletBalanceDTO';
import IWalletKeyDTO from '../dtos/IWalletKeyDTO';

export default interface IBlockchainProvider {
  showWalletBalance(publicAddress: string): Promise<IWalletBalanceDTO>;
  createWallet(): Promise<IWalletKeyDTO>;
}
