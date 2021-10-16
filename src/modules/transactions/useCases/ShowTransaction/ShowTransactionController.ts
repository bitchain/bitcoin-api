import { Request, Response } from 'express';

import { showTransactionProvider } from '@shared/providers';

import { ShowTransactionUseCase } from './ShowTransactionUseCase';

export class ShowTransactionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showTransaction = showTransactionProvider.resolve(
      ShowTransactionUseCase,
    );

    const transaction = await showTransaction.execute(id);

    return response.json(transaction);
  }
}
