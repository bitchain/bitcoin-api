interface ITransactionWallet {
  publicAddress: string;
  value: number;
}

export interface IShowTransactionDTO {
  publicId: string;
  confirmations: number;
  fee: number;
  date: string;
  walletsFrom: ITransactionWallet[];
  walletsTo: ITransactionWallet[];
}
