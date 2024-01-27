interface Input {
  address: string
  value: number
}

interface Output {
  address: string
  value: number
}

export interface ICreateTransactionRequestDTO {
  privateKey: string
  addressTo: string
  value: number
}

export interface ICreateTransactionResponseDTO {
  id: string
  fee: number
  transactionInput: Input[]
  transactionOutput: Output[]
}
