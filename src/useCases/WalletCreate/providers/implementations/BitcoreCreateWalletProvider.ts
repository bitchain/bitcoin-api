import bitcore from 'bitcore-lib';

import networkConfig from '@config/network';
import { ICreateWalletResponseDTO } from '../../CreateWalletDTO';

const networks = {
  mainnet: bitcore.Networks.mainnet.name,
  testnet: bitcore.Networks.testnet.name,
};

const network = networks[networkConfig.networkType];

export class BitcoreCreateWalletProvider {
  public async run(): Promise<ICreateWalletResponseDTO> {
    const bitcorePrivateKey = new bitcore.PrivateKey(network);

    const publicAddress = bitcorePrivateKey.toAddress().toString();
    const privateKey = bitcorePrivateKey.toWIF();

    return {
      publicAddress,
      privateKey,
    };
  }
}
