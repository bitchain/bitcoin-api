import { container } from 'tsyringe';

import { IProvidersRepository } from './IProvidersRepository';

import { PrismaProvidersRepository } from './implementations/PrismaProvidersRepository';

container.registerSingleton<IProvidersRepository>(
  'ProvidersRepository',
  PrismaProvidersRepository,
);
