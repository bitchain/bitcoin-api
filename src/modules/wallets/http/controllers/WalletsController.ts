import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateWalletService from '../../services/CreateWalletService';
import ShowWalletBalanceService from '../../services/ShowWalletBalanceService';

export default class WalletsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createWallet = container.resolve(CreateWalletService);

    const wallet = await createWallet.execute();

    return response.json(wallet);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showWalletBalance = container.resolve(ShowWalletBalanceService);

    const { publicAddress } = request.params;

    const walletBalance = await showWalletBalance.execute(publicAddress);

    return response.json(walletBalance);
  }
}
