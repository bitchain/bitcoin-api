interface Input {
  address: string
  value: number
}

interface Output {
  address: string
  value: number
}

export interface IShowTransactionDTO {
  id: string
  confirmations: number
  fee: number
  date: string
  transactionInput: Input[]
  transactionOutput: Output[]
}
