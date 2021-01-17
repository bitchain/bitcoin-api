import axios from 'axios';

import IBlockchainProvider from '../models/IBlockchainProvider';
import IWalletBalanceDTO from '../dtos/IWalletBalanceDTO';
import IWalletKeyDTO from '../dtos/IWalletKeyDTO';

const network = 'https://api.blockcypher.com/v1/btc/test3';

const api = axios.create({
  baseURL: network,
});

export default class BlockcypherProvider implements IBlockchainProvider {
  public async showWalletBalance(
    publicAddress: string,
  ): Promise<IWalletBalanceDTO | undefined> {
    const response = await api.get(`/addrs/${publicAddress}`);

    if (!response) {
      return undefined;
    }

    const {
      address,
      final_balance,
      balance,
      unconfirmed_balance,
    } = response.data;

    return {
      publicAddress: address,
      balance: final_balance,
      confirmedBalance: balance,
      unconfirmedBalance: unconfirmed_balance,
    };
  }

  public async createWallet(): Promise<IWalletKeyDTO | undefined> {
    const response = await api.post('/addrs');

    if (!response) {
      return undefined;
    }

    const { address, wif } = response.data;
    return { publicAddress: address, privateKey: wif };
  }
}
