import { ProviderInstance } from './providers';

import { ShowTransactionController } from './ShowTransactionController';

new ProviderInstance().resolve();

const showTransactionController = new ShowTransactionController();

export { showTransactionController };
