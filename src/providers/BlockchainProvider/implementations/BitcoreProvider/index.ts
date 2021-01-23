import IBlockchainProvider from '../../models/IBlockchainProvider';
import IWalletBalanceDTO from '../../dtos/IWalletBalanceDTO';
import IWalletKeyDTO from '../../dtos/IWalletKeyDTO';
import ITransactionDTO from '../../dtos/ITransactionDTO';

import BitcoreShowWalletBalanceService from './services/BitcoreShowWalletBalanceService';
import BitcoreCreateWalletService from './services/BitcoreCreateWalletService';
import BitcoreShowTransactionService from './services/BitcoreShowTransactionService';

export default class BitcoreProvider implements IBlockchainProvider {
  public async showWalletBalance(
    publicAddress: string,
  ): Promise<IWalletBalanceDTO> {
    const bitcoreShowWalletBalance = new BitcoreShowWalletBalanceService();

    return bitcoreShowWalletBalance.execute(publicAddress);
  }

  public async createWallet(): Promise<IWalletKeyDTO> {
    const bitcoreCreateWallet = new BitcoreCreateWalletService();

    return bitcoreCreateWallet.execute();
  }

  public async showTransaction(publicId: string): Promise<ITransactionDTO> {
    const bitcoreShowTransaction = new BitcoreShowTransactionService();

    return bitcoreShowTransaction.execute(publicId);
  }
}
