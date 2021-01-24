import IBlockchainProvider from '../../models/IBlockchainProvider';
import IWalletBalanceDTO from '../../dtos/IWalletBalanceDTO';
import IWalletKeyDTO from '../../dtos/IWalletKeyDTO';
import ITransactionDTO from '../../dtos/ITransactionDTO';
import ITransactionReferenceDTO from '../../dtos/ITransactionReferenceDTO';

import BlockcypherCreateWalletService from './services/BlockcypherCreateWalletService';
import BlockcypherShowWalletBalanceService from './services/BlockcypherShowWalletBalanceService';
import BlockcypherListWalletTransactionsService from './services/BlockcypherListWalletTransactionsService';
import BlockcypherShowTransactionService from './services/BlockcypherShowTransactionService';

export default class BlockcypherProvider implements IBlockchainProvider {
  public async createWallet(): Promise<IWalletKeyDTO> {
    const blockcypherCreateWallet = new BlockcypherCreateWalletService();

    return blockcypherCreateWallet.execute();
  }

  public async showWalletBalance(
    publicAddress: string,
  ): Promise<IWalletBalanceDTO> {
    const blockcypherShowWalletBalance = new BlockcypherShowWalletBalanceService();

    return blockcypherShowWalletBalance.execute(publicAddress);
  }

  public async listWalletTransactions(
    publicAddress: string,
  ): Promise<ITransactionReferenceDTO[]> {
    const blockcypherListWalletTransactionsService = new BlockcypherListWalletTransactionsService();

    return blockcypherListWalletTransactionsService.execute(publicAddress);
  }

  public async showTransaction(publicId: string): Promise<ITransactionDTO> {
    const blockcypherShowTransactionService = new BlockcypherShowTransactionService();

    return blockcypherShowTransactionService.execute(publicId);
  }
}
