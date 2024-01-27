import { container } from 'tsyringe'

import IDependencyProvider from '../IDependencyProvider'
import { BitcoreCreateWalletProvider } from './implementations/BitcoreCreateWalletProvider'
import { BlockcypherCreateWalletProvider } from './implementations/BlockcypherCreateWalletProvider'

const providers = [BlockcypherCreateWalletProvider, BitcoreCreateWalletProvider]

export default class CreateWalletProvider implements IDependencyProvider {
  resolve(useCase: any): any {
    if (!container.isRegistered('CreateWalletProvider')) {
      const provider = providers[Math.floor(Math.random() * providers.length)]

      const instance = container.resolve(provider)
      container.registerInstance('CreateWalletProvider', instance)
    }

    const createWallet = container.resolve(useCase)

    return createWallet
  }
}
