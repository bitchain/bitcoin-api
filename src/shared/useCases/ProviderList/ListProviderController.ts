import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListProviderUseCase } from './ListProviderUseCase';

export class ListProviderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listProvider = container.resolve(ListProviderUseCase);

    const providers = await listProvider.execute();

    return response.json(providers);
  }
}
