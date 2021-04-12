import { Router } from 'express';

import { robotsHandler } from '@http/middlewares/robotsHandler';

const robotsRouter = Router();

robotsRouter.get('/robots.txt', robotsHandler);

export { robotsRouter };
