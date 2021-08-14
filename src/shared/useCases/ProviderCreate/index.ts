import { container } from 'tsyringe';

import { CreateProviderUseCase } from './CreateProviderUseCase';

const createProviderUseCase = container.resolve(CreateProviderUseCase);

export { createProviderUseCase };
