import { container } from 'tsyringe';

import { IProvidersRepository } from './Providers/IProvidersRepository';

import { PrismaProvidersRepository } from './Providers/implementations/PrismaProvidersRepository';

container.registerSingleton<IProvidersRepository>(
  'ProvidersRepository',
  PrismaProvidersRepository,
);
