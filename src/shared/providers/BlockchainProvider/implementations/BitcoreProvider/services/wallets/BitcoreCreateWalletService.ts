import bitcore from 'bitcore-lib';
import IWalletKeyDTO from '@modules/wallets/dtos/IWalletKeyDTO';

import network from '../../network';

class BitcoreCreateWalletService {
  public async execute(): Promise<IWalletKeyDTO> {
    const bitcorePrivateKey = new bitcore.PrivateKey(network.name);

    const publicAddress = bitcorePrivateKey.toAddress().toString();
    const privateKey = bitcorePrivateKey.toWIF();

    return {
      publicAddress,
      privateKey,
    };
  }
}

export default BitcoreCreateWalletService;
