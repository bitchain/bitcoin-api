import { IShowTransactionDTO } from '../ShowTransactionDTO';

export interface IShowTransactionProvider {
  run(publicId: string): Promise<IShowTransactionDTO>;
}
