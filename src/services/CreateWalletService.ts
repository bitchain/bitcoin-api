import { injectable, inject } from 'tsyringe';

import IBlockchainProvider from '../providers/BlockchainProvider/models/IBlockchainProvider';
import IWalletKeyDTO from '../providers/BlockchainProvider/dtos/IWalletKeyDTO';

@injectable()
class CreateWalletService {
  constructor(
    @inject('BlockchainProvider')
    private blockchainProvider: IBlockchainProvider,
  ) {}

  public async execute(): Promise<IWalletKeyDTO | undefined> {
    return this.blockchainProvider.createWallet();
  }
}

export default CreateWalletService;
