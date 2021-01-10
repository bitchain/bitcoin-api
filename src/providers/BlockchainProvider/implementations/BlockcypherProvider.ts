import axios from 'axios';

import IBlockchainProvider from '../models/IBlockchainProvider';
import IPublicWalletInfoDTO from '../dtos/IPublicWalletInfoDTO';
import ICreateWalletDTO from '../dtos/ICreateWalletDTO';

const network = 'https://api.blockcypher.com/v1/btc/test3';

const api = axios.create({
  baseURL: network,
});

export default class BlockcypherProvider implements IBlockchainProvider {
  public async publicWalletInfo(
    publicAddress: string,
  ): Promise<IPublicWalletInfoDTO | undefined> {
    const response = await api.get(`/addrs/${publicAddress}`);

    if (!response) {
      return undefined;
    }

    const {
      address,
      total_received,
      total_sent,
      final_balance,
      unconfirmed_balance,
    } = response.data;

    return {
      publicAddress: address,
      totalAmountReceived: total_received,
      totalAmountSent: total_sent,
      balance: final_balance,
      unconfirmedBalance: unconfirmed_balance,
    };
  }

  public async createWallet(): Promise<ICreateWalletDTO | undefined> {
    const response = await api.post('/addrs');

    if (!response) {
      return undefined;
    }

    const { address, wif } = response.data;
    return { publicAddress: address, privateKey: wif };
  }
}
