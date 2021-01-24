import IWalletHistoryDTO from '@modules/wallets/dtos/IWalletHistoryDTO';

import network from '../network';

interface Txref {
  mintTxid: string;
  confirmations: number;
  value: number;
  mintHeight: number;
}

class BitcoreListWalletHistoryService {
  public async execute(publicAddress: string): Promise<IWalletHistoryDTO[]> {
    const response = await network.api.get(`/address/${publicAddress}`);

    const txrefs = response.data;

    const walletHistory = txrefs.map((txref: Txref) => {
      return {
        transactionId: txref.mintTxid,
        confirmations: txref.confirmations,
        value: txref.value,
        blockHeight: txref.mintHeight,
      };
    });

    return walletHistory;
  }
}

export default BitcoreListWalletHistoryService;
