import network from '../network';

import IWalletBalanceDTO from '../../../dtos/IWalletBalanceDTO';

class BlockcypherShowWalletBalanceService {
  public async execute(
    publicAddress: string,
  ): Promise<IWalletBalanceDTO | undefined> {
    const response = await network.get(`/addrs/${publicAddress}`);

    if (!response) {
      return undefined;
    }

    const {
      address,
      final_balance,
      balance,
      unconfirmed_balance,
    } = response.data;

    return {
      publicAddress: address,
      balance: final_balance,
      confirmedBalance: balance,
      unconfirmedBalance: unconfirmed_balance,
    };
  }
}

export default BlockcypherShowWalletBalanceService;
