import axios from 'axios';

import network from '../network';

import IWalletBalanceDTO from '../../../dtos/IWalletBalanceDTO';

const api = axios.create({
  baseURL: network.url,
});

class BitcoreShowWalletBalanceService {
  public async execute(publicAddress: string): Promise<IWalletBalanceDTO> {
    const response = await api.get(`/address/${publicAddress}/balance`);

    const { balance, confirmed, unconfirmed } = response.data;

    return {
      publicAddress,
      balance,
      confirmedBalance: confirmed,
      unconfirmedBalance: unconfirmed,
    };
  }
}

export default BitcoreShowWalletBalanceService;
