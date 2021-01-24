import ApplicationError from '@shared/errors/ApplicationError';
import ITransactionDTO from '@modules/transactions/dtos/ITransactionDTO';

import network from '../../network';

interface Input {
  address: string;
  value: number;
}

interface Output {
  address: string;
  value: number;
}

class BitcoreShowTransactionService {
  public async execute(publicId: string): Promise<ITransactionDTO> {
    try {
      const responseTx = await network.api.get(`/tx/${publicId}`);

      const { txid, fee, confirmations } = responseTx.data;

      const responseCoins = await network.api.get(`/tx/${publicId}/coins`);

      const { inputs, outputs } = responseCoins.data;

      const walletsFrom = inputs.map((input: Input) => {
        return { publicAddress: input.address, value: input.value };
      });

      const walletsTo = outputs
        .filter((output: Output) => output.address !== 'false')
        .map((output: Output) => {
          return { publicAddress: output.address, value: output.value };
        });

      return {
        publicId: txid,
        fee,
        confirmations,
        walletsFrom,
        walletsTo,
      };
    } catch (error) {
      const { response } = error;
      throw new ApplicationError(response.data, response.status);
    }
  }
}

export default BitcoreShowTransactionService;
