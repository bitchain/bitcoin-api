import bitcore from 'bitcore-lib';

import network from '../network';

import IWalletKeyDTO from '../../../dtos/IWalletKeyDTO';

class BitcoreCreateWalletService {
  public async execute(): Promise<IWalletKeyDTO | undefined> {
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
