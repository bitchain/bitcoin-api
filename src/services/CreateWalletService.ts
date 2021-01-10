import { injectable, inject } from 'tsyringe';

import IBlockchainProvider from '../providers/BlockchainProvider/models/IBlockchainProvider';
import ICreateWalletDTO from '../providers/BlockchainProvider/dtos/ICreateWalletDTO';

@injectable()
class CreateWalletService {
  constructor(
    @inject('BlockchainProvider')
    private blockchainProvider: IBlockchainProvider,
  ) {}

  public async execute(): Promise<ICreateWalletDTO | undefined> {
    return this.blockchainProvider.createWallet();
  }
}

export default CreateWalletService;
