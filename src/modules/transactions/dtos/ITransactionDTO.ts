interface ITransactionWallet {
  publicAddress: string;
  value: number;
}

export default interface ITransactionDTO {
  publicId: string;
  confirmations: number;
  fee: number;
  walletsFrom: ITransactionWallet[];
  walletsTo: ITransactionWallet[];
}
