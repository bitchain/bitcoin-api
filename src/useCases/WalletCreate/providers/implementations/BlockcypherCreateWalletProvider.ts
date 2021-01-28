import axios from 'axios';

import networkConfig from '@config/network';
import { ICreateWalletResponseDTO } from '../../CreateWalletDTO';

const networks = {
  mainnet: process.env.BLOCKCYPHER_MAINNET_API,
  testnet: process.env.BLOCKCYPHER_TESTNET_API,
};

const network = axios.create({
  baseURL: networks[networkConfig.networkType],
});

export class BlockcypherCreateWalletProvider {
  public async run(): Promise<ICreateWalletResponseDTO> {
    const response = await network.post('/addrs');

    const { address, wif } = response.data;
    return { publicAddress: address, privateKey: wif };
  }
}
