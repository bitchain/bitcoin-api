import { ProviderInstance } from './providers';

import { CreateTransactionController } from './CreateTransactionController';

new ProviderInstance().resolve();

const createTransactionController = new CreateTransactionController();

export { createTransactionController };
