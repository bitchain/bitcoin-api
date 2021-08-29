import {
  ICreateTransactionRequestDTO,
  ICreateTransactionResponseDTO,
} from '../CreateTransactionDTO';

export interface ICreateTransactionProvider {
  execute(
    data: ICreateTransactionRequestDTO,
  ): Promise<ICreateTransactionResponseDTO>;
}
