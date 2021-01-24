import { Router } from 'express';

import TransactionsController from '../controllers/TransactionsController';

const transactionsRouter = Router();

const transactionsController = new TransactionsController();

transactionsRouter.get('/:publicId', transactionsController.show);

export default transactionsRouter;
