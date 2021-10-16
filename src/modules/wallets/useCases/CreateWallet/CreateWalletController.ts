import { Request, Response } from 'express';

import { createWalletProvider } from '@shared/providers';

import { CreateWalletUseCase } from './CreateWalletUseCase';

export class CreateWalletController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createWallet = createWalletProvider.resolve(CreateWalletUseCase);

    const privateWallet = await createWallet.execute();

    return response.json(privateWallet);
  }
}
