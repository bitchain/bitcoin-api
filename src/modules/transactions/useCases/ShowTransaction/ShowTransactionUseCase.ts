import { injectable, inject } from 'tsyringe';

import { updateProviderScoreByInstanceUseCase } from '@shared/useCases/UpdateProviderScoreByInstance';

import { IShowTransactionProvider } from './providers/IShowTransactionProvider';
import { IShowTransactionDTO } from './ShowTransactionDTO';

@injectable()
export class ShowTransactionUseCase {
  constructor(
    @inject('ShowTransactionProvider')
    private showTransactionProvider: IShowTransactionProvider,
  ) {}

  public async execute(id: string): Promise<IShowTransactionDTO> {
    const instance = this.showTransactionProvider.constructor.name;

    try {
      const result = await this.showTransactionProvider.execute(id);

      await updateProviderScoreByInstanceUseCase.execute({
        instance,
        score: 1,
      });

      return result;
    } catch (error) {
      await updateProviderScoreByInstanceUseCase.execute({
        instance,
        score: -5,
      });

      throw error;
    }
  }
}
