import { IShowTransactionDTO } from '../ShowTransactionDTO';

export interface IShowTransactionProvider {
  execute(id: string): Promise<IShowTransactionDTO>;
}
