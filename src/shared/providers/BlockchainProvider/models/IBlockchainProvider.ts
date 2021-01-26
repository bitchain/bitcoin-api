import IWalletBalanceDTO from '@modules/wallets/dtos/IWalletBalanceDTO';
import IWalletHistoryDTO from '@modules/wallets/dtos/IWalletHistoryDTO';
import IWalletKeyDTO from '@modules/wallets/dtos/IWalletKeyDTO';

import ITransactionDTO from '@modules/transactions/dtos/ITransactionDTO';
import ITransactionFeeRequestDTO from '@modules/transactions/dtos/ITransactionFeeRequestDTO';
import ITransactionFeeResponseDTO from '@modules/transactions/dtos/ITransactionFeeResponseDTO';

export default interface IBlockchainProvider {
  createWallet(): Promise<IWalletKeyDTO>;
  showWalletBalance(publicAddress: string): Promise<IWalletBalanceDTO>;
  listWalletHistory(publicAddress: string): Promise<IWalletHistoryDTO[]>;

  showTransaction(publicId: string): Promise<ITransactionDTO>;
  showTransactionFee(
    transactionFeeRequest: ITransactionFeeRequestDTO,
  ): Promise<ITransactionFeeResponseDTO>;
}
