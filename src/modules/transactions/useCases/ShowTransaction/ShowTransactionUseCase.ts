import { injectable, inject } from 'tsyringe';

import { IShowTransactionDTO } from '@modules/transactions/dtos/IShowTransactionDTO';
import { IShowTransactionProvider } from '@shared/providers/ShowTransactionProvider/IShowTransactionProvider';

@injectable()
export class ShowTransactionUseCase {
  constructor(
    @inject('ShowTransactionProvider')
    private showTransactionProvider: IShowTransactionProvider,
  ) {}

  public async execute(id: string): Promise<IShowTransactionDTO> {
    const result = await this.showTransactionProvider.execute(id);

    return result;
  }
}
