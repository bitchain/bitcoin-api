import network from '../network';
import AppError from '../../../../../errors/AppError';

import ITransactionReferenceDTO from '../../../dtos/ITransactionReferenceDTO';

interface Txref {
  tx_hash: string;
  confirmations: number;
  value: number;
  block_height: number;
}

class BlockcypherShowTransactionService {
  public async execute(
    publicAddress: string,
  ): Promise<ITransactionReferenceDTO[]> {
    try {
      const response = await network.get(`/addrs/${publicAddress}`);

      const { txrefs } = response.data;

      const transactionsReference = txrefs.map((txref: Txref) => {
        return {
          publicId: txref.tx_hash,
          confirmations: txref.confirmations,
          value: txref.value,
          blockHeight: txref.block_height,
        };
      });

      return transactionsReference;
    } catch (error) {
      const { response } = error;
      throw new AppError(response.data.error, response.status);
    }
  }
}

export default BlockcypherShowTransactionService;
