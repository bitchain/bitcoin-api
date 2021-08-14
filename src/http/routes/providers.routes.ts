import { Router } from 'express';

import { listProviderController } from '@shared/useCases/ProviderList';

const providersRouter = Router();

providersRouter.get('/', listProviderController.handle);

export { providersRouter };
