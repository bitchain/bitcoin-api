import { address } from 'bitcoinjs-lib';

import networkConfig from '@config/network';

export class ValidateAddressUseCase {
  public execute(publicAddress: string): boolean {
    try {
      address.toOutputScript(publicAddress, networkConfig.bitcoinjs_type);

      return true;
    } catch (error) {
      return false;
    }
  }
}
