import { address } from 'bitcoinjs-lib';

import { bitcoinjs } from '@config/bitcoinjs';

export class ValidateAddressUseCase {
  public execute(publicAddress: string): boolean {
    try {
      address.toOutputScript(publicAddress, bitcoinjs.type);

      return true;
    } catch (error) {
      return false;
    }
  }
}
