import { injectable, inject } from 'tsyringe';

import { updateProviderScoreByInstanceUseCase } from '@shared/useCases/UpdateProviderScoreByInstance';

import { ICreateWalletProvider } from './providers/ICreateWalletProvider';
import { ICreateWalletResponseDTO } from './CreateWalletDTO';

@injectable()
export class CreateWalletUseCase {
  constructor(
    @inject('CreateWalletProvider')
    private createWalletProvider: ICreateWalletProvider,
  ) {}

  public async execute(): Promise<ICreateWalletResponseDTO> {
    const instance = this.createWalletProvider.constructor.name;

    try {
      const result = await this.createWalletProvider.execute();

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
