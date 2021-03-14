import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowTransactionUseCase } from './ShowTransactionUseCase';

export class ShowTransactionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showTransaction = container.resolve(ShowTransactionUseCase);

    const transaction = await showTransaction.execute(id);

    return response.json(transaction);
  }
}
