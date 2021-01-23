import IWalletBalanceDTO from '../dtos/IWalletBalanceDTO';
import IWalletKeyDTO from '../dtos/IWalletKeyDTO';
import ITransactionDTO from '../dtos/ITransactionDTO';

export default interface IBlockchainProvider {
  showWalletBalance(publicAddress: string): Promise<IWalletBalanceDTO>;
  createWallet(): Promise<IWalletKeyDTO>;
  showTransaction(publicId: string): Promise<ITransactionDTO>;
}
