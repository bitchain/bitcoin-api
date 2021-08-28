import { Router } from 'express';

import { listProvidersController } from '@shared/useCases/ListProviders';

const providersRouter = Router();

providersRouter.get('/', listProvidersController.handle);

export { providersRouter };
