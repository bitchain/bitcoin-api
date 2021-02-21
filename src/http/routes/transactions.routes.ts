import { Router } from 'express';

import {
  validateTransactionRequest,
  instanceCreateTransactionProvider,
  createTransactionController,
} from '@useCases/TransactionCreate';
import {
  validateTransactionFeeRequest,
  instanceShowTransactionFeeProvider,
  showTransactionFeeController,
} from '@useCases/TransactionFeeShow';

import {
  instanceShowTransactionProvider,
  showTransactionController,
} from '@useCases/TransactionShow';

const transactionsRouter = Router();

transactionsRouter.post(
  '/create',
  validateTransactionRequest,
  instanceCreateTransactionProvider,
  createTransactionController.handle,
);

transactionsRouter.post(
  '/fee',
  validateTransactionFeeRequest,
  instanceShowTransactionFeeProvider,
  showTransactionFeeController.handle,
);

transactionsRouter.get(
  '/:publicId',
  instanceShowTransactionProvider,
  showTransactionController.handle,
);

export { transactionsRouter };
