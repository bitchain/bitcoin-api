import { Request, Response } from 'express'

import { createTransactionProvider } from '@shared/providers'

import { CreateTransactionUseCase } from './CreateTransactionUseCase'

export class CreateTransactionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { privateKey, addressTo, value } = request.body

    const createTransaction = createTransactionProvider.resolve(
      CreateTransactionUseCase,
    )

    const transaction = await createTransaction.execute({
      privateKey,
      addressTo,
      value,
    })

    return response.json(transaction)
  }
}
