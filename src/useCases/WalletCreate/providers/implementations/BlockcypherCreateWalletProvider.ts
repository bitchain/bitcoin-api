import { blockcypher } from '@config/blockcypher';

import { ICreateWalletResponseDTO } from '../../CreateWalletDTO';
import { ICreateWalletProvider } from '../ICreateWalletProvider';

export class BlockcypherCreateWalletProvider implements ICreateWalletProvider {
  public providerKey = 'blockcypher_wallet_create';

  public async execute(): Promise<ICreateWalletResponseDTO> {
    const response = await blockcypher.api.post('/addrs');

    const { address, wif } = response.data;
    return { publicAddress: address, privateKey: wif };
  }
}
