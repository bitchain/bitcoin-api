import { blockcypher } from '@config/blockcypher';
import { ApplicationError } from '@errors/ApplicationError';

import { IShowWalletDTO } from '../../ShowWalletDTO';
import { IShowWalletProvider } from '../IShowWalletProvider';

interface Txref {
  tx_hash: string;
  confirmations: number;
  value: number;
  block_height: number;
}

export class BlockcypherShowWalletProvider implements IShowWalletProvider {
  public providerKey = 'blockcypher_wallet_show';

  public async execute(address: string): Promise<IShowWalletDTO> {
    try {
      const response = await blockcypher.api.get(`/addrs/${address}`);

      const {
        final_balance,
        balance,
        unconfirmed_balance,
        txrefs,
      } = response.data;

      const referenceTransactions = txrefs.map((txref: Txref) => {
        return {
          transactionId: txref.tx_hash,
          confirmations: txref.confirmations,
          value: txref.value,
          blockHeight: txref.block_height,
        };
      });

      return {
        address,
        balance: final_balance,
        confirmedBalance: balance,
        unconfirmedBalance: unconfirmed_balance,
        referenceTransactions,
      };
    } catch (error) {
      const { response } = error;
      throw new ApplicationError(response.data.error, response.status);
    }
  }
}
