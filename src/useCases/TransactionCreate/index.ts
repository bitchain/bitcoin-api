import { ProviderInstance } from './providers';

import { validateTransactionRequest } from './middlewares/validateTransactionRequest';
import { CreateTransactionController } from './CreateTransactionController';

new ProviderInstance().resolve();

const createTransactionController = new CreateTransactionController();

export { validateTransactionRequest, createTransactionController };
