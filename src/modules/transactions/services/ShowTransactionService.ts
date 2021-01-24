import { injectable, inject } from 'tsyringe';

import IBlockchainProvider from '@shared/providers/BlockchainProvider/models/IBlockchainProvider';
import ITransactionDTO from '../dtos/ITransactionDTO';

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
