import {
  IShowTransactionFeeRequestDTO,
  IShowTransactionFeeResponseDTO,
} from '../ShowTransactionFeeDTO';

export interface IShowTransactionFeeProvider {
  run(
    data: IShowTransactionFeeRequestDTO,
  ): Promise<IShowTransactionFeeResponseDTO>;
}
