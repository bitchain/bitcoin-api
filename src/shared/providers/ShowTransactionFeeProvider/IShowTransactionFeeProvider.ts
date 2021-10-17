import {
  IShowTransactionFeeRequestDTO,
  IShowTransactionFeeResponseDTO,
} from '@modules/transactions/dtos/IShowTransactionFeeDTO';

export interface IShowTransactionFeeProvider {
  providerKey: string;
  execute(
    data: IShowTransactionFeeRequestDTO,
  ): Promise<IShowTransactionFeeResponseDTO>;
}
