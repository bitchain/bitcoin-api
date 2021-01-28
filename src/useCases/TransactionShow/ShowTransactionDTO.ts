interface ITransactionWallet {
  publicAddress: string;
  value: number;
}

export interface IShowTransactionDTO {
  publicId: string;
  confirmations: number;
  fee: number;
  walletsFrom: ITransactionWallet[];
  walletsTo: ITransactionWallet[];
}
