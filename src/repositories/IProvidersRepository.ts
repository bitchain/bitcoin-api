export interface IProvidersRepository {
  subscribe(providerKeys: string[]): Promise<void>;
  findLowestCalls(providerKeys: string[]): Promise<string>;
  registerFailedCall(providerKey: string): Promise<void>;
  registerSuccessfulCall(providerKey: string): Promise<void>;
}
