import { blockcypher } from '@config/blockcypher';
import { ApplicationError } from '@errors/ApplicationError';

import { IShowTransactionDTO } from '../../ShowTransactionDTO';
import { IShowTransactionProvider } from '../IShowTransactionProvider';

interface Input {
  addresses: string[];
  output_value: number;
}

interface Output {
  addresses: string[];
  value: number;
}

export class BlockcypherShowTransactionProvider
  implements IShowTransactionProvider {
  public async execute(id: string): Promise<IShowTransactionDTO> {
    try {
      const response = await blockcypher.api.get(`/txs/${id}`);

      const {
        hash,
        fees,
        confirmations,
        confirmed,
        inputs,
        outputs,
      } = response.data;

      const transactionInput = inputs
        .filter((input: Input) => input.addresses)
        .map((input: Input) => {
          return {
            address: input.addresses[0],
            value: input.output_value,
          };
        });

      const transactionOutput = outputs
        .filter((output: Output) => output.addresses)
        .map((output: Output) => {
          return { address: output.addresses[0], value: output.value };
        });

      return {
        id: hash,
        fee: fees,
        confirmations,
        date: confirmed,
        transactionInput,
        transactionOutput,
      };
    } catch (error) {
      const { response } = error;
      throw new ApplicationError(response.data.error, response.status);
    }
  }
}
