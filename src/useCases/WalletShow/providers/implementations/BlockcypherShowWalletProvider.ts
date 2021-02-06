import axios from 'axios';

import { ApplicationError } from '@errors/ApplicationError';
import networkConfig from '@config/network';
import { IShowWalletDTO } from '../../ShowWalletDTO';
import { IShowWalletProvider } from '../IShowWalletProvider';

const networks = {
  mainnet: process.env.BLOCKCYPHER_MAINNET_API,
  testnet: process.env.BLOCKCYPHER_TESTNET_API,
};

const network = axios.create({
  baseURL: networks[networkConfig.networkType],
});

interface Txref {
  tx_hash: string;
  confirmations: number;
  value: number;
  block_height: number;
}

export class BlockcypherShowWalletProvider implements IShowWalletProvider {
  public providerKey = 'blockcypher_wallet_show';

  public async execute(publicAddress: string): Promise<IShowWalletDTO> {
    try {
      const response = await network.get(`/addrs/${publicAddress}`);

      const {
        address,
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
        publicAddress: address,
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
