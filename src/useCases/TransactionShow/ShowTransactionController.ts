import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowTransactionUseCase } from './ShowTransactionUseCase';

export class ShowTransactionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { publicId } = request.params;

    const showTransaction = container.resolve(ShowTransactionUseCase);

    const transaction = await showTransaction.execute(publicId);

    return response.json(transaction);
  }
}
