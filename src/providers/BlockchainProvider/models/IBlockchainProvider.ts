import IWalletBalanceDTO from '../dtos/IWalletBalanceDTO';
import IWalletKeyDTO from '../dtos/IWalletKeyDTO';
import ITransactionDTO from '../dtos/ITransactionDTO';
import ITransactionReferenceDTO from '../dtos/ITransactionReferenceDTO';

export default interface IBlockchainProvider {
  createWallet(): Promise<IWalletKeyDTO>;
  showWalletBalance(publicAddress: string): Promise<IWalletBalanceDTO>;
  listWalletTransactions(
    publicAddress: string,
  ): Promise<ITransactionReferenceDTO[]>;
  showTransaction(publicId: string): Promise<ITransactionDTO>;
}
