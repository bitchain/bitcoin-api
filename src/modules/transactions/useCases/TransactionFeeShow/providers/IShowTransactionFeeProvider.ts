import {
  IShowTransactionFeeRequestDTO,
  IShowTransactionFeeResponseDTO,
} from '../ShowTransactionFeeDTO';

export interface IShowTransactionFeeProvider {
  providerKey: string;
  execute(
    data: IShowTransactionFeeRequestDTO,
  ): Promise<IShowTransactionFeeResponseDTO>;
}
