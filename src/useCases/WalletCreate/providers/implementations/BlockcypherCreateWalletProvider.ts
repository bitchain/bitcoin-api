import axios from 'axios';

import networkConfig from '@config/network';

import { ICreateWalletResponseDTO } from '../../CreateWalletDTO';
import { ICreateWalletProvider } from '../ICreateWalletProvider';

const networks = {
  mainnet: process.env.BLOCKCYPHER_MAINNET_API,
  testnet: process.env.BLOCKCYPHER_TESTNET_API,
};

const network = axios.create({
  baseURL: networks[networkConfig.networkType],
});

export class BlockcypherCreateWalletProvider implements ICreateWalletProvider {
  public providerKey = 'blockcypher_wallet_create';

  public async execute(): Promise<ICreateWalletResponseDTO> {
    const response = await network.post('/addrs');

    const { address, wif } = response.data;
    return { publicAddress: address, privateKey: wif };
  }
}
