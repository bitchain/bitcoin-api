import { injectable, inject } from 'tsyringe';

import IBlockchainProvider from '../providers/BlockchainProvider/models/IBlockchainProvider';
import IShowWalletBalanceDTO from '../providers/BlockchainProvider/dtos/IShowWalletBalanceDTO';

@injectable()
class ShowWalletBalanceService {
  constructor(
    @inject('BlockchainProvider')
    private blockchainProvider: IBlockchainProvider,
  ) {}

  public async execute(
    address: string,
  ): Promise<IShowWalletBalanceDTO | undefined> {
    return this.blockchainProvider.showWalletBalance(address);
  }
}

export default ShowWalletBalanceService;
