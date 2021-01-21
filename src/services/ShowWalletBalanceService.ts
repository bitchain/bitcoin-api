import { injectable, inject } from 'tsyringe';

import IBlockchainProvider from '../providers/BlockchainProvider/models/IBlockchainProvider';
import IWalletBalanceDTO from '../providers/BlockchainProvider/dtos/IWalletBalanceDTO';

@injectable()
class ShowWalletBalanceService {
  constructor(
    @inject('BlockchainProvider')
    private blockchainProvider: IBlockchainProvider,
  ) {}

  public async execute(publicAddress: string): Promise<IWalletBalanceDTO> {
    return this.blockchainProvider.showWalletBalance(publicAddress);
  }
}

export default ShowWalletBalanceService;
