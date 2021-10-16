import CreateWalletProvider from './CreateWalletProvider';
import ShowWalletProvider from './ShowWalletProvider';

import ShowTransactionProvider from './ShowTransactionProvider';
import ShowTransactionFeeProvider from './ShowTransactionFeeProvider';
import CreateTransactionProvider from './CreateTransactionProvider';

export const showWalletProvider: ShowWalletProvider = new ShowWalletProvider();
export const createWalletProvider: CreateWalletProvider =
  new CreateWalletProvider();

export const showTransactionProvider: ShowTransactionProvider =
  new ShowTransactionProvider();
export const showTransactionFeeProvider: ShowTransactionFeeProvider =
  new ShowTransactionFeeProvider();

export const createTransactionProvider: CreateTransactionProvider =
  new CreateTransactionProvider();
