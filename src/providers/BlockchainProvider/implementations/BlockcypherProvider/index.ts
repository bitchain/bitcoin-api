import IBlockchainProvider from '../../models/IBlockchainProvider';
import IWalletBalanceDTO from '../../dtos/IWalletBalanceDTO';
import IWalletKeyDTO from '../../dtos/IWalletKeyDTO';

import BlockcypherShowWalletBalanceService from './services/BlockcypherShowWalletBalanceService';
import BlockcypherCreateWalletService from './services/BlockcypherCreateWalletService';

export default class BlockcypherProvider implements IBlockchainProvider {
  public async showWalletBalance(
    publicAddress: string,
  ): Promise<IWalletBalanceDTO | undefined> {
    const blockcypherShowWalletBalance = new BlockcypherShowWalletBalanceService();

    return blockcypherShowWalletBalance.execute(publicAddress);
  }

  public async createWallet(): Promise<IWalletKeyDTO | undefined> {
    const blockcypherCreateWallet = new BlockcypherCreateWalletService();

    return blockcypherCreateWallet.execute();
  }
}
