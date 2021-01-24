import { injectable, inject } from 'tsyringe';

import IBlockchainProvider from '../providers/BlockchainProvider/models/IBlockchainProvider';
import ITransactionReferenceDTO from '../providers/BlockchainProvider/dtos/ITransactionReferenceDTO';

@injectable()
class ListWalletTransactionsService {
  constructor(
    @inject('BlockchainProvider')
    private blockchainProvider: IBlockchainProvider,
  ) {}

  public async execute(
    publicAddress: string,
  ): Promise<ITransactionReferenceDTO[]> {
    return this.blockchainProvider.listWalletTransactions(publicAddress);
  }
}

export default ListWalletTransactionsService;
