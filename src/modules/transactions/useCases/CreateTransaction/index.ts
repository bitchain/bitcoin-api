import { CreateTransactionController } from './CreateTransactionController';

import { instanceCreateTransactionProvider } from './middlewares/instanceCreateTransactionProvider';
import { validateTransactionRequest } from './middlewares/validateTransactionRequest';

const createTransactionController = new CreateTransactionController();

export {
  validateTransactionRequest,
  instanceCreateTransactionProvider,
  createTransactionController,
};
