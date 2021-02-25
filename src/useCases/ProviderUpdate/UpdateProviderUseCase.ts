import { injectable, inject } from 'tsyringe';

import { IProvidersRepository } from '@repositories/IProvidersRepository';
import { IUpdateProviderDTO } from './UpdateProviderDTO';

@injectable()
export class UpdateProviderUseCase {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
  ) {}

  public async execute({
    providerKey,
    successfulCall,
  }: IUpdateProviderDTO): Promise<void> {
    const provider = await this.providersRepository.findByKey(providerKey);

    if (!provider) return;

    const calls = Number(provider.calls) + 1;

    if (successfulCall) {
      const success = Number(provider.success) + 1;

      await this.providersRepository.save({
        ...provider,
        success,
        calls,
      });
    } else {
      const fails = Number(provider.fails) + 1;

      await this.providersRepository.save({
        ...provider,
        fails,
        calls,
      });
    }
  }
}
