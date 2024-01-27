import { address as bitcoinjsAddr } from 'bitcoinjs-lib'

import { bitcoinjs } from '@config/bitcoinjs'

export const validAddress = (address: string): boolean => {
  try {
    bitcoinjsAddr.toOutputScript(address, bitcoinjs.type)

    return true
  } catch (error) {
    return false
  }
}
