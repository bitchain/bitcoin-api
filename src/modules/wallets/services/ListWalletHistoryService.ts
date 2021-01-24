import { injectable, inject } from 'tsyringe';

import IBlockchainProvider from '@shared/providers/BlockchainProvider/models/IBlockchainProvider';
import IWalletHistoryDTO from '../dtos/IWalletHistoryDTO';

@injectable()
class ListWalletHistoryService {
  constructor(
    @inject('BlockchainProvider')
    private blockchainProvider: IBlockchainProvider,
  ) {}

  public async execute(publicAddress: string): Promise<IWalletHistoryDTO[]> {
    return this.blockchainProvider.listWalletHistory(publicAddress);
  }
}

export default ListWalletHistoryService;
