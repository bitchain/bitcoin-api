import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateTransactionUseCase } from './CreateTransactionUseCase';

export class CreateTransactionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { privateKey, addressTo, value } = request.body;

    const createTransaction = container.resolve(CreateTransactionUseCase);

    const transaction = await createTransaction.execute({
      privateKey,
      addressTo,
      value,
    });

    return response.json(transaction);
  }
}
