import { ECPair } from 'bitcoinjs-lib'

import { bitcoinjs } from '@config/bitcoinjs'

export const validPrivateKey = (privateKey: string): boolean => {
  try {
    ECPair.fromWIF(privateKey, bitcoinjs.type)

    return true
  } catch (error) {
    return false
  }
}
