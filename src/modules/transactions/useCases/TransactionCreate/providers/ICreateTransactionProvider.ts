import {
  ICreateTransactionRequestDTO,
  ICreateTransactionResponseDTO,
} from '../CreateTransactionDTO';

export interface ICreateTransactionProvider {
  providerKey: string;
  execute(
    data: ICreateTransactionRequestDTO,
  ): Promise<ICreateTransactionResponseDTO>;
}
