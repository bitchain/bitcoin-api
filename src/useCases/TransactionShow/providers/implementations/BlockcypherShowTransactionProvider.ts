import axios from 'axios';

import { ApplicationError } from '@errors/ApplicationError';
import networkConfig from '@config/network';

import { IShowTransactionDTO } from '../../ShowTransactionDTO';

const networks = {
  mainnet: process.env.BLOCKCYPHER_MAINNET_API,
  testnet: process.env.BLOCKCYPHER_TESTNET_API,
};

const network = axios.create({
  baseURL: networks[networkConfig.networkType],
});

interface Input {
  addresses: string[];
  output_value: number;
}

interface Output {
  addresses: string[];
  value: number;
}

export class BlockcypherShowTransactionProvider {
  public async run(publicId: string): Promise<IShowTransactionDTO> {
    try {
      const response = await network.get(`/txs/${publicId}`);

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
