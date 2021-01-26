import { Router } from 'express';

import TransactionsController from '../controllers/TransactionsController';
import TransactionFeeController from '../controllers/TransactionFeeController';

const transactionsRouter = Router();

const transactionsController = new TransactionsController();
const transactionFeeController = new TransactionFeeController();

transactionsRouter.get('/:publicId', transactionsController.show);
transactionsRouter.post('/fee', transactionFeeController.show);

export default transactionsRouter;
