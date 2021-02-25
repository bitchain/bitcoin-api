import { Provider } from '@entities/Provider';

export interface IProvidersRepository {
  list(): Promise<Provider[]>;

  findByKey(providerKey: string): Promise<Provider | null>;
  findByKeys(providerKeys: string[]): Promise<Provider[]>;
  findByLowestCalls(providerKeys: string[]): Promise<Provider | null>;

  save(provider: Provider): Promise<void>;
  createMany(providerKeys: string[]): Promise<void>;
}
