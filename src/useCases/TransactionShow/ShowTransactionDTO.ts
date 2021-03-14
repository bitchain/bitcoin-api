interface ITransactionWallet {
  address: string;
  value: number;
}

export interface IShowTransactionDTO {
  id: string;
  confirmations: number;
  fee: number;
  date: string;
  walletsFrom: ITransactionWallet[];
  walletsTo: ITransactionWallet[];
}
