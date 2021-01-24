import { injectable, inject } from 'tsyringe';

import IBlockchainProvider from '@shared/providers/BlockchainProvider/models/IBlockchainProvider';
import IWalletKeyDTO from '../dtos/IWalletKeyDTO';

@injectable()
class CreateWalletService {
  constructor(
    @inject('BlockchainProvider')
    private blockchainProvider: IBlockchainProvider,
  ) {}

  public async execute(): Promise<IWalletKeyDTO> {
    return this.blockchainProvider.createWallet();
  }
}

export default CreateWalletService;
