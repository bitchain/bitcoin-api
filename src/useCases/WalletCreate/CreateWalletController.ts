import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateWalletUseCase } from './CreateWalletUseCase';

export class CreateWalletController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createWallet = container.resolve(CreateWalletUseCase);

    const privateWallet = await createWallet.execute();

    return response.json(privateWallet);
  }
}
