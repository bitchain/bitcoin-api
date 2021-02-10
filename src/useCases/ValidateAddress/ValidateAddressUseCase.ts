import { address, networks } from 'bitcoinjs-lib';

import networkConfig from '@config/network';

const appNetworks = {
  mainnet: networks.bitcoin,
  testnet: networks.testnet,
};

const appNetwork = appNetworks[networkConfig.networkType];

export class ValidateAddressUseCase {
  public execute(publicAddress: string): boolean {
    try {
      address.toOutputScript(publicAddress, appNetwork);

      return true;
    } catch (error) {
      return false;
    }
  }
}
