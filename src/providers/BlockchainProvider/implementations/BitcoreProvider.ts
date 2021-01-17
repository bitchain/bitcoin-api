import bitcore from 'bitcore-lib';
import axios from 'axios';

import IBlockchainProvider from '../models/IBlockchainProvider';
import IWalletBalanceDTO from '../dtos/IWalletBalanceDTO';
import IWalletKeyDTO from '../dtos/IWalletKeyDTO';

const network = 'https://api.bitcore.io/api/BTC/testnet';

const api = axios.create({
  baseURL: network,
});

export default class BitcoreProvider implements IBlockchainProvider {
  public async showWalletBalance(
    publicAddress: string,
  ): Promise<IWalletBalanceDTO | undefined> {
    const response = await api.get(`/address/${publicAddress}/balance`);

    if (!response) {
      return undefined;
    }

    const { balance, confirmed, unconfirmed } = response.data;

    return {
      publicAddress,
      balance,
      confirmedBalance: confirmed,
      unconfirmedBalance: unconfirmed,
    };
  }

  public async createWallet(): Promise<IWalletKeyDTO | undefined> {
    const bitcorePrivateKey = new bitcore.PrivateKey(
      bitcore.Networks.testnet.name,
    );

    const publicAddress = bitcorePrivateKey.toAddress().toString();
    const privateKey = bitcorePrivateKey.toWIF();

    return {
      publicAddress,
      privateKey,
    };
  }
}
