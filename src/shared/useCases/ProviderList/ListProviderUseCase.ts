import { injectable, inject } from 'tsyringe';

import { Provider } from '@entities/Provider';
import { IProvidersRepository } from '@repositories/IProvidersRepository';

@injectable()
export class ListProviderUseCase {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
  ) {}

  public async execute(): Promise<Provider[]> {
    return this.providersRepository.list();
  }
}
