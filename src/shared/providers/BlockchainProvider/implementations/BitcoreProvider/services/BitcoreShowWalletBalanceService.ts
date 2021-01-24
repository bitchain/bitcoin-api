import IWalletBalanceDTO from '@modules/wallets/dtos/IWalletBalanceDTO';

import network from '../network';

class BitcoreShowWalletBalanceService {
  public async execute(publicAddress: string): Promise<IWalletBalanceDTO> {
    const response = await network.api.get(`/address/${publicAddress}/balance`);

    const { balance, confirmed, unconfirmed } = response.data;

    return {
      publicAddress,
      balance,
      confirmedBalance: confirmed,
      unconfirmedBalance: unconfirmed,
    };
  }
}

export default BitcoreShowWalletBalanceService;
