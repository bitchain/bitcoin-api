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
  publicId: string;
  fee: number;
  walletsFrom: ITransactionWallet[];
  walletsTo: ITransactionWallet[];
}
