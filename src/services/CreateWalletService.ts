import { injectable, inject } from 'tsyringe';

import IBlockchainProvider from '../providers/BlockchainProvider/models/IBlockchainProvider';

@injectable()
class CreateWalletService {
  constructor(
    @inject('BlockchainProvider')
    private blockchainProvider: IBlockchainProvider,
  ) {}

  public async execute(): Promise<any> {
    const response = await this.blockchainProvider.createWallet();

    return response;
  }
}

export default CreateWalletService;
