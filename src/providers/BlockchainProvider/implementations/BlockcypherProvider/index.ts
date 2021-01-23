import IBlockchainProvider from '../../models/IBlockchainProvider';
import IWalletBalanceDTO from '../../dtos/IWalletBalanceDTO';
import IWalletKeyDTO from '../../dtos/IWalletKeyDTO';
import ITransactionDTO from '../../dtos/ITransactionDTO';

import BlockcypherShowWalletBalanceService from './services/BlockcypherShowWalletBalanceService';
import BlockcypherCreateWalletService from './services/BlockcypherCreateWalletService';
import BlockcypherShowTransactionService from './services/BlockcypherShowTransactionService';

export default class BlockcypherProvider implements IBlockchainProvider {
  public async showWalletBalance(
    publicAddress: string,
  ): Promise<IWalletBalanceDTO> {
    const blockcypherShowWalletBalance = new BlockcypherShowWalletBalanceService();

    return blockcypherShowWalletBalance.execute(publicAddress);
  }

  public async createWallet(): Promise<IWalletKeyDTO> {
    const blockcypherCreateWallet = new BlockcypherCreateWalletService();

    return blockcypherCreateWallet.execute();
  }

  public async showTransaction(publicId: string): Promise<ITransactionDTO> {
    const blockcypherShowTransactionService = new BlockcypherShowTransactionService();

    return blockcypherShowTransactionService.execute(publicId);
  }
}
