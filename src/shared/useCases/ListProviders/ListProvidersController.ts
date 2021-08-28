import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListProvidersUseCase } from './ListProvidersUseCase';

export class ListProvidersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listProviders = container.resolve(ListProvidersUseCase);

    const providers = await listProviders.execute();

    return response.json(providers);
  }
}
