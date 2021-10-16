import { blockcypher, IntegrationError } from '@config/blockcypher';
import { HttpError } from '@shared/errors/HttpError';

import { IShowWalletDTO } from '@modules/wallets/dtos/IShowWalletDTO';
import { IShowWalletProvider } from '../IShowWalletProvider';

interface Txref {
  tx_hash: string;
  confirmations: number;
  value: number;
  block_height: number;
}

export class BlockcypherShowWalletProvider implements IShowWalletProvider {
  public async execute(address: string): Promise<IShowWalletDTO> {
    try {
      const response = await blockcypher.api.get(`/addrs/${address}`);

      const { final_balance, balance, unconfirmed_balance, txrefs } =
        response.data;

      const transactionsReference = txrefs.map((txref: Txref) => {
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
        transactionsReference,
      };
    } catch (error) {
      const { response } = error as IntegrationError;

      const message = response?.data.error;
      const status = response?.status;
      throw new HttpError(message, status);
    }
  }
}
