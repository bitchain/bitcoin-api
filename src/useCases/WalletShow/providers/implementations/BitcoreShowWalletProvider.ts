import { bitcore } from '@config/bitcore';

import { IShowWalletDTO } from '../../ShowWalletDTO';
import { IShowWalletProvider } from '../IShowWalletProvider';

interface Txref {
  mintTxid: string;
  confirmations: number;
  value: number;
  mintHeight: number;
}

export class BitcoreShowWalletProvider implements IShowWalletProvider {
  public providerKey = 'bitcore_wallet_show';

  public async execute(publicAddress: string): Promise<IShowWalletDTO> {
    const responseBalance = await bitcore.api.get(
      `/address/${publicAddress}/balance`,
    );

    const { balance, confirmed, unconfirmed } = responseBalance.data;

    const responseTransactions = await bitcore.api.get(
      `/address/${publicAddress}`,
    );

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
