interface ITransactionWallet {
  address: string;
  value: number;
}

export interface ICreateTransactionRequestDTO {
  privateKey: string;
  addressTo: string;
  value: number;
}

export interface ICreateTransactionResponseDTO {
  id: string;
  fee: number;
  walletsFrom: ITransactionWallet[];
  walletsTo: ITransactionWallet[];
}
