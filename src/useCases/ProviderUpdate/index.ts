import { container } from 'tsyringe';

import { UpdateProviderUseCase } from './UpdateProviderUseCase';

const updateProviderUseCase = container.resolve(UpdateProviderUseCase);

export { updateProviderUseCase };
