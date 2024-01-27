import { container } from 'tsyringe'

import IDependencyProvider from '../IDependencyProvider'
import { BitcoreShowWalletProvider } from './implementations/BitcoreShowWalletProvider'
import { BlockcypherShowWalletProvider } from './implementations/BlockcypherShowWalletProvider'

const providers = [BlockcypherShowWalletProvider, BitcoreShowWalletProvider]

export default class ShowWalletProvider implements IDependencyProvider {
  resolve(useCase: any): any {
    if (!container.isRegistered('ShowWalletProvider')) {
      const provider = providers[Math.floor(Math.random() * providers.length)]

      const instance = container.resolve(provider)
      container.registerInstance('ShowWalletProvider', instance)
    }

    const showWallet = container.resolve(useCase)

    return showWallet
  }
}
