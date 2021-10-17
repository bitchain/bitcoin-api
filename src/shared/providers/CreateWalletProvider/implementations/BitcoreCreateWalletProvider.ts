import { PrivateKey } from 'bitcore-lib';

import { bitcore } from '@config/bitcore';
import { ICreateWalletDTO } from '@modules/wallets/dtos/ICreateWalletDTO';

import { ICreateWalletProvider } from '../ICreateWalletProvider';

export class BitcoreCreateWalletProvider implements ICreateWalletProvider {
  public async execute(): Promise<ICreateWalletDTO> {
    const bitcorePrivateKey = new PrivateKey(bitcore.type);

    const address = bitcorePrivateKey.toAddress().toString();
    const privateKey = bitcorePrivateKey.toWIF();

    return {
      address,
      privateKey,
    };
  }
}
