import IWalletBalanceDTO from '@modules/wallets/dtos/IWalletBalanceDTO';
import IWalletHistoryDTO from '@modules/wallets/dtos/IWalletHistoryDTO';
import IWalletKeyDTO from '@modules/wallets/dtos/IWalletKeyDTO';

import ITransactionDTO from '@modules/transactions/dtos/ITransactionDTO';

import IBlockchainProvider from '../../models/IBlockchainProvider';

import BlockcypherCreateWalletService from './services/BlockcypherCreateWalletService';
import BlockcypherShowWalletBalanceService from './services/BlockcypherShowWalletBalanceService';
import BlockcypherListWalletHistoryService from './services/BlockcypherListWalletHistoryService';

import BlockcypherShowTransactionService from './services/BlockcypherShowTransactionService';

export default class BlockcypherProvider implements IBlockchainProvider {
  public async createWallet(): Promise<IWalletKeyDTO> {
    const createWallet = new BlockcypherCreateWalletService();

    return createWallet.execute();
  }

  public async showWalletBalance(
    publicAddress: string,
  ): Promise<IWalletBalanceDTO> {
    const showWalletBalance = new BlockcypherShowWalletBalanceService();

    return showWalletBalance.execute(publicAddress);
  }

  public async listWalletHistory(
    publicAddress: string,
  ): Promise<IWalletHistoryDTO[]> {
    const listWalletHistory = new BlockcypherListWalletHistoryService();

    return listWalletHistory.execute(publicAddress);
  }

  public async showTransaction(publicId: string): Promise<ITransactionDTO> {
    const showTransaction = new BlockcypherShowTransactionService();

    return showTransaction.execute(publicId);
  }
}
