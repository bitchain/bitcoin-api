import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListWalletHistoryService from '../../services/ListWalletHistoryService';

export default class WalletHistoryController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listWalletHistory = container.resolve(ListWalletHistoryService);

    const { publicAddress } = request.params;

    const walletHistory = await listWalletHistory.execute(publicAddress);

    return response.json(walletHistory);
  }
}
