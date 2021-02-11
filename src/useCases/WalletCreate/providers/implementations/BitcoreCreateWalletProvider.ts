import { PrivateKey } from 'bitcore-lib';

import networkConfig from '@config/network';

import { ICreateWalletResponseDTO } from '../../CreateWalletDTO';
import { ICreateWalletProvider } from '../ICreateWalletProvider';

export class BitcoreCreateWalletProvider implements ICreateWalletProvider {
  public providerKey = 'bitcore_wallet_create';

  public async execute(): Promise<ICreateWalletResponseDTO> {
    const bitcorePrivateKey = new PrivateKey(networkConfig.bitcore_type);

    const publicAddress = bitcorePrivateKey.toAddress().toString();
    const privateKey = bitcorePrivateKey.toWIF();

    return {
      publicAddress,
      privateKey,
    };
  }
}
