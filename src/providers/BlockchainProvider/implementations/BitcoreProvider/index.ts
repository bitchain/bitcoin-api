import IBlockchainProvider from '../../models/IBlockchainProvider';
import IWalletBalanceDTO from '../../dtos/IWalletBalanceDTO';
import IWalletKeyDTO from '../../dtos/IWalletKeyDTO';
import ITransactionDTO from '../../dtos/ITransactionDTO';
import ITransactionReferenceDTO from '../../dtos/ITransactionReferenceDTO';

import BitcoreCreateWalletService from './services/BitcoreCreateWalletService';
import BitcoreShowWalletBalanceService from './services/BitcoreShowWalletBalanceService';
import BitcoreListWalletTransactionsService from './services/BitcoreListWalletTransactionsService';
import BitcoreShowTransactionService from './services/BitcoreShowTransactionService';

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

  public async listWalletTransactions(
    publicAddress: string,
  ): Promise<ITransactionReferenceDTO[]> {
    const listWalletTransactions = new BitcoreListWalletTransactionsService();

    return listWalletTransactions.execute(publicAddress);
  }

  public async showTransaction(publicId: string): Promise<ITransactionDTO> {
    const showTransaction = new BitcoreShowTransactionService();

    return showTransaction.execute(publicId);
  }
}
