import { blockcypher, IntegrationError } from '@config/blockcypher';
import { IShowTransactionDTO } from '@modules/transactions/dtos/IShowTransactionDTO';
import { HttpError } from '@shared/errors/HttpError';

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
  implements IShowTransactionProvider
{
  public async execute(id: string): Promise<IShowTransactionDTO> {
    try {
      const response = await blockcypher.api.get(`/txs/${id}`);

      const { hash, fees, confirmations, confirmed, inputs, outputs } =
        response.data;

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
      const { response } = error as IntegrationError;

      const message = response?.data.error;
      const status = response?.status;
      throw new HttpError(message, status);
    }
  }
}
