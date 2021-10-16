import { blockcypher, IntegrationError } from '@config/blockcypher';
import { HttpError } from '@shared/errors/HttpError';

import {
  IShowTransactionFeeRequestDTO,
  IShowTransactionFeeResponseDTO,
} from '@modules/transactions/dtos/IShowTransactionFeeDTO';
import { IShowTransactionFeeProvider } from '../IShowTransactionFeeProvider';

export class BlockcypherShowTransactionFeeProvider
  implements IShowTransactionFeeProvider
{
  public providerKey = 'blockcypher_transaction_fee_show';

  public async execute({
    addressFrom,
    addressTo,
    value,
  }: IShowTransactionFeeRequestDTO): Promise<IShowTransactionFeeResponseDTO> {
    try {
      const inputs = [{ addresses: [addressFrom] }];
      const outputs = [{ addresses: [addressTo], value }];

      const response = await blockcypher.api.post('/txs/new', {
        inputs,
        outputs,
      });

      const { tx } = response.data;

      return {
        transactionEstimatedFee: tx.fees,
      };
    } catch (error) {
      const { response } = error as IntegrationError;

      const message = response?.data.errors[0].error;
      const status = response?.status;
      throw new HttpError(message, status);
    }
  }
}
