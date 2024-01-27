export interface IShowTransactionFeeRequestDTO {
  addressFrom: string
  addressTo: string
  value: number
}

export interface IShowTransactionFeeResponseDTO {
  transactionEstimatedFee: number
}
