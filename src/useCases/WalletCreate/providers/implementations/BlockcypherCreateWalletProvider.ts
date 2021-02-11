import networkConfig from '@config/network';

import { ICreateWalletResponseDTO } from '../../CreateWalletDTO';
import { ICreateWalletProvider } from '../ICreateWalletProvider';

const api = networkConfig.blockcypher_api;

export class BlockcypherCreateWalletProvider implements ICreateWalletProvider {
  public providerKey = 'blockcypher_wallet_create';

  public async execute(): Promise<ICreateWalletResponseDTO> {
    const response = await api.post('/addrs');

    const { address, wif } = response.data;
    return { publicAddress: address, privateKey: wif };
  }
}
