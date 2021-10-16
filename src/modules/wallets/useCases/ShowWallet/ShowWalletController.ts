import { Request, Response } from 'express';

import { showWalletProvider } from '@shared/providers';

import { ShowWalletUseCase } from './ShowWalletUseCase';

export class ShowWalletController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { address } = request.params;

    const showWallet = showWalletProvider.resolve(ShowWalletUseCase);

    const publicWallet = await showWallet.execute(address);

    return response.json(publicWallet);
  }
}
