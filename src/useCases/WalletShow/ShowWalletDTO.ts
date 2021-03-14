interface ITransactionsReference {
  transactionId: string;
  confirmations: number;
  value: number;
  blockHeight: number;
}

export interface IShowWalletDTO {
  address: string;
  balance: number;
  confirmedBalance: number;
  unconfirmedBalance: number;
  transactionsReference: ITransactionsReference[];
}
