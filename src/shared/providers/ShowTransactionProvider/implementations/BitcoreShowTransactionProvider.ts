import { bitcore } from '@config/bitcore';
import { ApplicationError } from '@errors/ApplicationError';

import { IShowTransactionDTO } from '@modules/transactions/dtos/IShowTransactionDTO';
import { IShowTransactionProvider } from '../IShowTransactionProvider';

interface Input {
  address: string;
  value: number;
}

interface Output {
  address: string;
  value: number;
}

export class BitcoreShowTransactionProvider
  implements IShowTransactionProvider
{
  public async execute(id: string): Promise<IShowTransactionDTO> {
    try {
      const responseTx = await bitcore.api.get(`/tx/${id}`);

      const { txid, fee, confirmations, blockTime } = responseTx.data;

      const responseCoins = await bitcore.api.get(`/tx/${id}/coins`);

      const { inputs, outputs } = responseCoins.data;

      const transactionInput = inputs.map((input: Input) => {
        return { address: input.address, value: input.value };
      });

      const transactionOutput = outputs
        .filter((output: Output) => output.address !== 'false')
        .map((output: Output) => {
          return { address: output.address, value: output.value };
        });

      return {
        id: txid,
        fee,
        confirmations,
        date: blockTime,
        transactionInput,
        transactionOutput,
      };
    } catch (error) {
      const { response } = error;
      throw new ApplicationError(response.data, response.status);
    }
  }
}
