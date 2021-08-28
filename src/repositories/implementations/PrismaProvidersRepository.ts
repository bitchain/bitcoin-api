import { PrismaClient } from '@prisma/client';

import { Provider } from 'entities/Provider';

import { IProvidersRepository } from '../IProvidersRepository';

const prisma = new PrismaClient();

export class PrismaProvidersRepository implements IProvidersRepository {
  async list(): Promise<Provider[]> {
    return prisma.provider.findMany();
  }

  async findByInstance(instance: string): Promise<Provider | null> {
    return prisma.provider.findUnique({
      where: { instance },
    });
  }

  async create(provider: Provider): Promise<Provider> {
    const newProvider = await prisma.provider.create({ data: provider });

    return newProvider;
  }

  async update(provider: Provider): Promise<Provider> {
    const { id } = provider;

    const updatedProvider = await prisma.provider.update({
      where: { id },
      data: provider,
    });

    return updatedProvider;
  }
}
