import ApplicationError from '@shared/errors/ApplicationError';
import IWalletBalanceDTO from '@modules/wallets/dtos/IWalletBalanceDTO';

import network from '../../network';

class BlockcypherShowWalletBalanceService {
  public async execute(publicAddress: string): Promise<IWalletBalanceDTO> {
    try {
      const response = await network.get(`/addrs/${publicAddress}`);

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
    } catch (error) {
      const { response } = error;
      throw new ApplicationError(response.data.error, response.status);
    }
  }
}

export default BlockcypherShowWalletBalanceService;
