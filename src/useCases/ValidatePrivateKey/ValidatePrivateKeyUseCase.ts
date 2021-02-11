import { ECPair } from 'bitcoinjs-lib';

import networkConfig from '@config/network';

export class ValidatePrivateKeyUseCase {
  public execute(privateKey: string): boolean {
    try {
      ECPair.fromWIF(privateKey, networkConfig.bitcoinjs_type);

      return true;
    } catch (error) {
      return false;
    }
  }
}
