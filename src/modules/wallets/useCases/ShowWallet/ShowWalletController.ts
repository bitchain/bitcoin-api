import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowWalletUseCase } from './ShowWalletUseCase';

export class ShowWalletController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { address } = request.params;

    const showWallet = container.resolve(ShowWalletUseCase);

    const publicWallet = await showWallet.execute(address);

    return response.json(publicWallet);
  }
}
