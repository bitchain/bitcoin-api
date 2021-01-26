import ApplicationError from '@shared/errors/ApplicationError';
import ITransactionFeeRequestDTO from '@modules/transactions/dtos/ITransactionFeeRequestDTO';
import ITransactionFeeResponseDTO from '@modules/transactions/dtos/ITransactionFeeResponseDTO';

import network from '../../network';

class BlockcypherShowTransactionFeeService {
  public async execute({
    addressFrom,
    addressTo,
    value,
  }: ITransactionFeeRequestDTO): Promise<ITransactionFeeResponseDTO> {
    try {
      const response = await network.post('/txs/new', {
        inputs: [
          {
            addresses: [addressFrom],
          },
        ],
        outputs: [
          {
            addresses: [addressTo],
            value,
          },
        ],
      });

      const { tx } = response.data;

      return {
        transactionFee: tx.fees,
      };
    } catch (error) {
      const { response } = error;
      throw new ApplicationError(
        response.data.errors[0].error,
        response.status,
      );
    }
  }
}

export default BlockcypherShowTransactionFeeService;
