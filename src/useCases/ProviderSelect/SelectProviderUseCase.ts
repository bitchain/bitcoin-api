import { injectable, inject } from 'tsyringe';

import { IProvidersRepository } from '@repositories/IProvidersRepository';

@injectable()
export class SelectProviderUseCase {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
  ) {}

  public async execute(providerKeys: string[]): Promise<string> {
    const provider = await this.providersRepository.findByLowestCalls(
      providerKeys,
    );

    if (!provider) {
      throw new Error('Provider cannot be null');
    }

    return provider.providerKey;
  }
}
