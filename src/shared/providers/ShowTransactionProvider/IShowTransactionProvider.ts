import { IShowTransactionDTO } from '@modules/transactions/dtos/IShowTransactionDTO';

export interface IShowTransactionProvider {
  execute(id: string): Promise<IShowTransactionDTO>;
}
