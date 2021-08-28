import { container, injectable, inject } from 'tsyringe';

import { Provider } from '@entities/Provider';
import { IProvidersRepository } from '@repositories/IProvidersRepository';
import { ICreateProviderDTO } from './CreateProviderDTO';

@injectable()
export class CreateProviderUseCase {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
  ) {}

  public async execute<T>({
    injectionToken,
    instanceObj,
  }: ICreateProviderDTO): Promise<Provider> {
    const instance = instanceObj.name;

    const providerInstance = container.resolve<T>(instanceObj);

    container.registerInstance<T>(injectionToken, providerInstance);

    const existingProvider = await this.providersRepository.findByInstance(
      instance,
    );

    if (existingProvider) return existingProvider;

    const provider = await this.providersRepository.create({
      injectionToken,
      instance,
    });

    return provider;
  }
}
