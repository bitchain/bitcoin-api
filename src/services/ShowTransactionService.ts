import { injectable, inject } from 'tsyringe';

import IBlockchainProvider from '../providers/BlockchainProvider/models/IBlockchainProvider';
import ITransactionDTO from '../providers/BlockchainProvider/dtos/ITransactionDTO';

@injectable()
class ShowTransactionService {
  constructor(
    @inject('BlockchainProvider')
    private blockchainProvider: IBlockchainProvider,
  ) {}

  public async execute(publicId: string): Promise<ITransactionDTO> {
    return this.blockchainProvider.showTransaction(publicId);
  }
}

export default ShowTransactionService;
