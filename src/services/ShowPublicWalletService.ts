import { injectable, inject } from 'tsyringe';

import IBlockchainProvider from '../providers/BlockchainProvider/models/IBlockchainProvider';
import IPublicWalletInfoDTO from '../providers/BlockchainProvider/dtos/IPublicWalletInfoDTO';

@injectable()
class ShowPublicWalletService {
  constructor(
    @inject('BlockchainProvider')
    private blockchainProvider: IBlockchainProvider,
  ) {}

  public async execute(
    address: string,
  ): Promise<IPublicWalletInfoDTO | undefined> {
    return this.blockchainProvider.publicWalletInfo(address);
  }
}

export default ShowPublicWalletService;
