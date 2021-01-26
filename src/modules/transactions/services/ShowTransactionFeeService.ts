import { injectable, inject } from 'tsyringe';

import IBlockchainProvider from '@shared/providers/BlockchainProvider/models/IBlockchainProvider';
import ITransactionFeeRequestDTO from '../dtos/ITransactionFeeRequestDTO';
import ITransactionFeeResponseDTO from '../dtos/ITransactionFeeResponseDTO';

@injectable()
class ShowTransactionFeeService {
  constructor(
    @inject('BlockchainProvider')
    private blockchainProvider: IBlockchainProvider,
  ) {}

  public async execute(
    transactionFeeRequest: ITransactionFeeRequestDTO,
  ): Promise<ITransactionFeeResponseDTO> {
    return this.blockchainProvider.showTransactionFee(transactionFeeRequest);
  }
}

export default ShowTransactionFeeService;
