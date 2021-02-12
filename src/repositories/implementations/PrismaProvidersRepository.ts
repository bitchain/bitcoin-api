import { PrismaClient } from '@prisma/client';

import { IProvidersRepository } from '../IProvidersRepository';

const prisma = new PrismaClient();

export class PrismaProvidersRepository implements IProvidersRepository {
  async subscribe(providerKeys: string[]): Promise<void> {
    const providers = await prisma.provider.findMany({
      where: { providerKey: { in: providerKeys } },
    });

    const subscribedKeys = providers.map(provider => provider.providerKey);

    const newKeys = providerKeys.filter(key => !subscribedKeys.includes(key));

    const newProviders = newKeys.map(newKey => ({ providerKey: newKey }));

    if (!newProviders) return;

    await prisma.provider.createMany({
      data: newProviders,
    });
  }

  async findLowestCalls(providerKeys: string[]): Promise<string> {
    const provider = await prisma.provider.findFirst({
      where: { providerKey: { in: providerKeys } },
      orderBy: { calls: 'asc' },
    });

    if (!provider) {
      throw new Error('Provider cannot be null');
    }

    return provider.providerKey;
  }

  async registerFailedCall(providerKey: string): Promise<void> {
    const provider = await prisma.provider.findUnique({
      where: { providerKey },
    });

    if (!provider) {
      throw new Error('Provider cannot be null');
    }

    await prisma.provider.update({
      data: {
        success: provider?.success,
        fails: provider?.fails + 1,
        calls: provider?.calls + 1,
      },
      where: { providerKey },
    });
  }

  async registerSuccessfulCall(providerKey: string): Promise<void> {
    const provider = await prisma.provider.findUnique({
      where: { providerKey },
    });

    if (!provider) {
      throw new Error('Provider cannot be null');
    }

    await prisma.provider.update({
      data: {
        success: provider?.success + 1,
        fails: provider?.fails,
        calls: provider?.calls + 1,
      },
      where: { providerKey },
    });
  }
}
