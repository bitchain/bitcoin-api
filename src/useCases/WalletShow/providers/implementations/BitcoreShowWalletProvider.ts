import networkConfig from '@config/network';

import { IShowWalletDTO } from '../../ShowWalletDTO';
import { IShowWalletProvider } from '../IShowWalletProvider';

interface Txref {
  mintTxid: string;
  confirmations: number;
  value: number;
  mintHeight: number;
}

const api = networkConfig.bitcore_api;

export class BitcoreShowWalletProvider implements IShowWalletProvider {
  public providerKey = 'bitcore_wallet_show';

  public async execute(publicAddress: string): Promise<IShowWalletDTO> {
    const responseBalance = await api.get(`/address/${publicAddress}/balance`);

    const { balance, confirmed, unconfirmed } = responseBalance.data;

    const responseTransactions = await api.get(`/address/${publicAddress}`);

    const txrefs = responseTransactions.data;

    const referenceTransactions = txrefs.map((txref: Txref) => {
      return {
        transactionId: txref.mintTxid,
        confirmations: txref.confirmations,
        value: txref.value,
        blockHeight: txref.mintHeight,
      };
    });

    return {
      publicAddress,
      balance,
      confirmedBalance: confirmed,
      unconfirmedBalance: unconfirmed,
      referenceTransactions,
    };
  }
}
