import { container } from 'tsyringe';

import { UpdateProviderScoreByInstanceUseCase } from './UpdateProviderScoreByInstanceUseCase';

const updateProviderScoreByInstanceUseCase = container.resolve(
  UpdateProviderScoreByInstanceUseCase,
);

export { updateProviderScoreByInstanceUseCase };
