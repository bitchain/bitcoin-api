import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowTransactionFeeUseCase } from './ShowTransactionFeeUseCase';

export class ShowTransactionFeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { addressFrom, addressTo, value } = request.body;

    const showTransactionFee = container.resolve(ShowTransactionFeeUseCase);

    const fee = await showTransactionFee.execute({
      addressFrom,
      addressTo,
      value,
    });

    return response.json(fee);
  }
}
