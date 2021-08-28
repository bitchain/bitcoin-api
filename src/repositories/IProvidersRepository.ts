import { Provider } from '@entities/Provider';

export interface IProvidersRepository {
  list(): Promise<Provider[]>;
  findByInstance(instance: string): Promise<Provider | null>;
  create(provider: Provider): Promise<Provider>;
  update(provider: Provider): Promise<Provider>;
}
