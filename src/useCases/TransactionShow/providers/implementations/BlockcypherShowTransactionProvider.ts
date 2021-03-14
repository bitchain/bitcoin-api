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
  public providerKey = 'blockcypher_transaction_show';

  public async execute(publicId: string): Promise<IShowTransactionDTO> {
    try {
      const response = await blockcypher.api.get(`/txs/${publicId}`);

      const {
        hash,
        fees,
        confirmations,
        confirmed,
        inputs,
        outputs,
      } = response.data;

      const walletsFrom = inputs
        .filter((input: Input) => input.addresses)
        .map((input: Input) => {
          return {
            address: input.addresses[0],
            value: input.output_value,
          };
        });

      const walletsTo = outputs
        .filter((output: Output) => output.addresses)
        .map((output: Output) => {
          return { address: output.addresses[0], value: output.value };
        });

      return {
        publicId: hash,
        fee: fees,
        confirmations,
        date: confirmed,
        walletsFrom,
        walletsTo,
      };
    } catch (error) {
      const { response } = error;
      throw new ApplicationError(response.data.error, response.status);
    }
  }
}
