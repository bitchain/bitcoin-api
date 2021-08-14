import { ShowTransactionController } from './ShowTransactionController';

import { instanceShowTransactionProvider } from './middlewares/instanceShowTransactionProvider';

const showTransactionController = new ShowTransactionController();

export { instanceShowTransactionProvider, showTransactionController };
