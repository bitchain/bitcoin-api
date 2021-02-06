import { IShowTransactionDTO } from '../ShowTransactionDTO';

export interface IShowTransactionProvider {
  providerKey: string;
  execute(publicId: string): Promise<IShowTransactionDTO>;
}
