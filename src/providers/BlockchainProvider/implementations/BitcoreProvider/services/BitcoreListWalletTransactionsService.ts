import network from '../network';

import ITransactionReferenceDTO from '../../../dtos/ITransactionReferenceDTO';

interface Txref {
  mintTxid: string;
  confirmations: number;
  value: number;
  mintHeight: number;
}

class BitcoreListWalletTransactionsService {
  public async execute(
    publicAddress: string,
  ): Promise<ITransactionReferenceDTO[]> {
    const response = await network.api.get(`/address/${publicAddress}`);

    const txrefs = response.data;

    const transactionsReference = txrefs.map((txref: Txref) => {
      return {
        publicId: txref.mintTxid,
        confirmations: txref.confirmations,
        value: txref.value,
        blockHeight: txref.mintHeight,
      };
    });

    return transactionsReference;
  }
}

export default BitcoreListWalletTransactionsService;
