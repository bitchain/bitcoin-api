import { container } from 'tsyringe';

import { IProvidersRepository } from './Providers/IProvidersRepository';

import { PrismaProvidersRepository } from './Providers/implementations/PrismaProvidersRepository';

const repositories = {
  prisma: container.resolve(PrismaProvidersRepository),
};

container.registerInstance<IProvidersRepository>(
  'ProvidersRepository',
  repositories.prisma,
);
