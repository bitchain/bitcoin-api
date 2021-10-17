import { blockcypher } from '@config/blockcypher';
import { ICreateWalletDTO } from '@modules/wallets/dtos/ICreateWalletDTO';

import { ICreateWalletProvider } from '../ICreateWalletProvider';

export class BlockcypherCreateWalletProvider implements ICreateWalletProvider {
  public async execute(): Promise<ICreateWalletDTO> {
    const response = await blockcypher.api.post('/addrs');

    const { address, wif } = response.data;
    return { address, privateKey: wif };
  }
}
