import { PrismaClient } from '@prisma/client';

import { Provider } from 'entities/Provider';

import { IProvidersRepository } from '../IProvidersRepository';

const prisma = new PrismaClient();

export class PrismaProvidersRepository implements IProvidersRepository {
  async list(): Promise<Provider[]> {
    return prisma.provider.findMany();
  }

  async findByKey(providerKey: string): Promise<Provider | null> {
    return prisma.provider.findUnique({
      where: { providerKey },
    });
  }

  async findByKeys(providerKeys: string[]): Promise<Provider[]> {
    return prisma.provider.findMany({
      where: { providerKey: { in: providerKeys } },
    });
  }

  async findByLowestCalls(providerKeys: string[]): Promise<Provider | null> {
    return prisma.provider.findFirst({
      where: { providerKey: { in: providerKeys } },
      orderBy: { calls: 'asc' },
    });
  }

  async save(provider: Provider): Promise<void> {
    await prisma.provider.update({
      data: provider,
      where: { providerKey: provider.providerKey },
    });
  }

  async createMany(providerKeys: string[]): Promise<void> {
    const newKeys = providerKeys.map(key => ({ providerKey: key }));

    await prisma.provider.createMany({
      data: newKeys,
    });
  }
}
