import { Request, Response } from 'express'

import { showTransactionFeeProvider } from '@shared/providers'

import { ShowTransactionFeeUseCase } from './ShowTransactionFeeUseCase'

export class ShowTransactionFeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { addressFrom, addressTo, value } = request.body

    const showTransactionFee = showTransactionFeeProvider.resolve(
      ShowTransactionFeeUseCase,
    )

    const fee = await showTransactionFee.execute({
      addressFrom,
      addressTo,
      value,
    })

    return response.json(fee)
  }
}
