import { injectable, inject } from 'tsyringe';

import { IShowTransactionProvider } from './providers/IShowTransactionProvider';
import { IShowTransactionDTO } from './ShowTransactionDTO';

@injectable()
export class ShowTransactionUseCase {
  constructor(
    @inject('ShowTransactionProvider')
    private showTransactionProvider: IShowTransactionProvider,
  ) {}

  public async execute(publicId: string): Promise<IShowTransactionDTO> {
    return this.showTransactionProvider.run(publicId);
  }
}
