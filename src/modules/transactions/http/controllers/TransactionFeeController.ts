import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowTransactionFeeService from '../../services/ShowTransactionFeeService';

export default class TransactionsFeeController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showTransactionFee = container.resolve(ShowTransactionFeeService);

    const { addressFrom, addressTo, value } = request.body;

    const transactionFee = await showTransactionFee.execute({
      addressFrom,
      addressTo,
      value,
    });

    return response.json(transactionFee);
  }
}
