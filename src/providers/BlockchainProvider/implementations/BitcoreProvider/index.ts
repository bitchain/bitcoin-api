import IBlockchainProvider from '../../models/IBlockchainProvider';
import IWalletBalanceDTO from '../../dtos/IWalletBalanceDTO';
import IWalletKeyDTO from '../../dtos/IWalletKeyDTO';

import BitcoreShowWalletBalanceService from './services/BitcoreShowWalletBalanceService';
import BitcoreCreateWalletService from './services/BitcoreCreateWalletService';

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
}
