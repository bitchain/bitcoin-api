import { container } from 'tsyringe';

import { SelectProviderUseCase } from './SelectProviderUseCase';

const selectProviderUseCase = container.resolve(SelectProviderUseCase);

export { selectProviderUseCase };
