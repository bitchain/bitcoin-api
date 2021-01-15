import bitcore from 'bitcore-lib';
import axios from 'axios';

import IBlockchainProvider from '../models/IBlockchainProvider';
import IPublicWalletInfoDTO from '../dtos/IPublicWalletInfoDTO';
import ICreateWalletDTO from '../dtos/ICreateWalletDTO';

const network = 'https://api.bitcore.io/api/BTC/testnet';

const api = axios.create({
  baseURL: network,
});

export default class BitcoreProvider implements IBlockchainProvider {
  public async publicWalletInfo(
    publicAddress: string,
  ): Promise<IPublicWalletInfoDTO | undefined> {
    const response = await api.get(`/address/${publicAddress}/balance`);

    if (!response) {
      return undefined;
    }

    const { balance, unconfirmed } = response.data;

    return {
      publicAddress,
      balance,
      unconfirmedBalance: unconfirmed,
    };
  }

  public async createWallet(): Promise<ICreateWalletDTO | undefined> {
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
