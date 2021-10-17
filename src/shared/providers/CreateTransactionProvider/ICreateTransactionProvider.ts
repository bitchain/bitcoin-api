import {
  ICreateTransactionRequestDTO,
  ICreateTransactionResponseDTO,
} from '@modules/transactions/dtos/ICreateTransactionDTO';

export interface ICreateTransactionProvider {
  execute(
    data: ICreateTransactionRequestDTO,
  ): Promise<ICreateTransactionResponseDTO>;
}
