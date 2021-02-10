import { ECPair, networks } from 'bitcoinjs-lib';

import networkConfig from '@config/network';

const appNetworks = {
  mainnet: networks.bitcoin,
  testnet: networks.testnet,
};

const appNetwork = appNetworks[networkConfig.networkType];

export class ValidatePrivateKeyUseCase {
  public execute(privateKey: string): boolean {
    try {
      ECPair.fromWIF(privateKey, appNetwork);

      return true;
    } catch (error) {
      return false;
    }
  }
}
