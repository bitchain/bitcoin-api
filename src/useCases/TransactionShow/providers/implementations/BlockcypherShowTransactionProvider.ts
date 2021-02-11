import networkConfig from '@config/network';
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

const api = networkConfig.blockcypher_api;

export class BlockcypherShowTransactionProvider
  implements IShowTransactionProvider {
  public providerKey = 'blockcypher_transaction_show';

  public async execute(publicId: string): Promise<IShowTransactionDTO> {
    try {
      const response = await api.get(`/txs/${publicId}`);

      const { hash, fees, confirmations, inputs, outputs } = response.data;

      const walletsFrom = inputs
        .filter((input: Input) => input.addresses)
        .map((input: Input) => {
          return {
            publicAddress: input.addresses[0],
            value: input.output_value,
          };
        });

      const walletsTo = outputs
        .filter((output: Output) => output.addresses)
        .map((output: Output) => {
          return { publicAddress: output.addresses[0], value: output.value };
        });

      return {
        publicId: hash,
        fee: fees,
        confirmations,
        walletsFrom,
        walletsTo,
      };
    } catch (error) {
      const { response } = error;
      throw new ApplicationError(response.data.error, response.status);
    }
  }
}
