import ApplicationError from '@shared/errors/ApplicationError';
import IWalletHistoryDTO from '@modules/wallets/dtos/IWalletHistoryDTO';

import network from '../../network';

interface Txref {
  tx_hash: string;
  confirmations: number;
  value: number;
  block_height: number;
}

class BlockcypherListWalletHistoryService {
  public async execute(publicAddress: string): Promise<IWalletHistoryDTO[]> {
    try {
      const response = await network.get(`/addrs/${publicAddress}`);

      const { txrefs } = response.data;

      const walletHistory = txrefs.map((txref: Txref) => {
        return {
          transactionId: txref.tx_hash,
          confirmations: txref.confirmations,
          value: txref.value,
          blockHeight: txref.block_height,
        };
      });

      return walletHistory;
    } catch (error) {
      const { response } = error;
      throw new ApplicationError(response.data.error, response.status);
    }
  }
}

export default BlockcypherListWalletHistoryService;
