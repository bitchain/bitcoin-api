import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowTransactionService from '../../services/ShowTransactionService';

export default class TransactionsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showTransaction = container.resolve(ShowTransactionService);

    const { publicId } = request.params;

    const transaction = await showTransaction.execute(publicId);

    return response.json(transaction);
  }
}
