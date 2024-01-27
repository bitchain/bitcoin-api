import CreateTransactionProvider from './CreateTransactionProvider'
import CreateWalletProvider from './CreateWalletProvider'
import ShowTransactionFeeProvider from './ShowTransactionFeeProvider'
import ShowTransactionProvider from './ShowTransactionProvider'
import ShowWalletProvider from './ShowWalletProvider'

export const showWalletProvider: ShowWalletProvider = new ShowWalletProvider()
export const createWalletProvider: CreateWalletProvider =
  new CreateWalletProvider()

export const showTransactionProvider: ShowTransactionProvider =
  new ShowTransactionProvider()
export const showTransactionFeeProvider: ShowTransactionFeeProvider =
  new ShowTransactionFeeProvider()

export const createTransactionProvider: CreateTransactionProvider =
  new CreateTransactionProvider()
