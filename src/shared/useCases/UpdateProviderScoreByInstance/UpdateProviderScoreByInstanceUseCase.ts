import { injectable, inject } from 'tsyringe';

import { IProvidersRepository } from '@repositories/IProvidersRepository';
import { IUpdateProviderScoreByInstanceDTO } from './IUpdateProviderScoreByInstanceDTO';

@injectable()
export class UpdateProviderScoreByInstanceUseCase {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
  ) {}

  public async execute({
    instance,
    score,
  }: IUpdateProviderScoreByInstanceDTO): Promise<void> {
    const provider = await this.providersRepository.findByInstance(instance);

    if (!provider) return;

    const calls = Number(provider.calls) + 1;

    const newScore = Number(provider.score) + score;

    await this.providersRepository.update({
      ...provider,
      score: newScore >= 0 ? newScore : 0,
      calls,
    });
  }
}
