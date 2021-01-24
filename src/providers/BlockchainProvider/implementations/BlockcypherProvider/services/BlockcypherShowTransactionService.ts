import network from '../network';
import AppError from '../../../../../errors/AppError';

import ITransactionDTO from '../../../dtos/ITransactionDTO';

interface Input {
  addresses: string[];
  output_value: number;
}

interface Output {
  addresses: string[];
  value: number;
}

class BlockcypherShowTransactionService {
  public async execute(publicId: string): Promise<ITransactionDTO> {
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
      throw new AppError(response.data.error, response.status);
    }
  }
}

export default BlockcypherShowTransactionService;
