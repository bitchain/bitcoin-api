import IWalletBalanceDTO from '@modules/wallets/dtos/IWalletBalanceDTO';
import IWalletHistoryDTO from '@modules/wallets/dtos/IWalletHistoryDTO';
import IWalletKeyDTO from '@modules/wallets/dtos/IWalletKeyDTO';

import ITransactionDTO from '@modules/transactions/dtos/ITransactionDTO';

import IBlockchainProvider from '../../models/IBlockchainProvider';

import BitcoreCreateWalletService from './services/wallets/BitcoreCreateWalletService';
import BitcoreShowWalletBalanceService from './services/wallets/BitcoreShowWalletBalanceService';
import BitcoreListWalletHistoryService from './services/wallets/BitcoreListWalletHistoryService';

import BitcoreShowTransactionService from './services/transactions/BitcoreShowTransactionService';

export default class BitcoreProvider implements IBlockchainProvider {
  public async createWallet(): Promise<IWalletKeyDTO> {
    const createWallet = new BitcoreCreateWalletService();

    return createWallet.execute();
  }

  public async showWalletBalance(
    publicAddress: string,
  ): Promise<IWalletBalanceDTO> {
    const showWalletBalance = new BitcoreShowWalletBalanceService();

    return showWalletBalance.execute(publicAddress);
  }

  public async listWalletHistory(
    publicAddress: string,
  ): Promise<IWalletHistoryDTO[]> {
    const listWalletHistory = new BitcoreListWalletHistoryService();

    return listWalletHistory.execute(publicAddress);
  }

  public async showTransaction(publicId: string): Promise<ITransactionDTO> {
    const showTransaction = new BitcoreShowTransactionService();

    return showTransaction.execute(publicId);
  }
}
