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
  public async execute(address: string): Promise<IShowWalletDTO> {
    const responseBalance = await bitcore.api.get(
      `/address/${address}/balance`,
    );

    const { balance, confirmed, unconfirmed } = responseBalance.data;

    const responseTransactions = await bitcore.api.get(`/address/${address}`);

    const txrefs = responseTransactions.data;

    const transactionsReference = txrefs.map((txref: Txref) => {
      return {
        transactionId: txref.mintTxid,
        confirmations: txref.confirmations,
        value: txref.value,
        blockHeight: txref.mintHeight,
      };
    });

    return {
      address,
      balance,
      confirmedBalance: confirmed,
      unconfirmedBalance: unconfirmed,
      transactionsReference,
    };
  }
}
