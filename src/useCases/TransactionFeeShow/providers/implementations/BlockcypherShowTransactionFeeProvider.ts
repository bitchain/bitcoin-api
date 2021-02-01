import axios from 'axios';

import { ApplicationError } from '@errors/ApplicationError';
import networkConfig from '@config/network';

import {
  IShowTransactionFeeRequestDTO,
  IShowTransactionFeeResponseDTO,
} from '../../ShowTransactionFeeDTO';

const networks = {
  mainnet: process.env.BLOCKCYPHER_MAINNET_API,
  testnet: process.env.BLOCKCYPHER_TESTNET_API,
};

const network = axios.create({
  baseURL: networks[networkConfig.networkType],
});

export class BlockcypherShowTransactionFeeProvider {
  public async run({
    addressFrom,
    addressTo,
    value,
  }: IShowTransactionFeeRequestDTO): Promise<IShowTransactionFeeResponseDTO> {
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
        transactionEstimatedFee: tx.fees,
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
