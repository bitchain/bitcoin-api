import { IShowTransactionDTO } from '../ShowTransactionDTO';

export interface IShowTransactionProvider {
  providerKey: string;
  execute(id: string): Promise<IShowTransactionDTO>;
}
