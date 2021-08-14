import { injectable, inject } from 'tsyringe';

import { IProvidersRepository } from '@repositories/IProvidersRepository';

@injectable()
export class CreateProviderUseCase {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
  ) {}

  public async execute(providerKeys: string[]): Promise<void> {
    const providers = await this.providersRepository.findByKeys(providerKeys);

    const subscribedKeys = providers.map(provider => provider.providerKey);

    const newKeys = providerKeys.filter(key => !subscribedKeys.includes(key));

    if (!newKeys) return;

    await this.providersRepository.createMany(newKeys);
  }
}
