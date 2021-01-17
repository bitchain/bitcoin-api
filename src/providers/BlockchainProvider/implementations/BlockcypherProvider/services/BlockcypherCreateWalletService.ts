import network from '../network';

import IWalletKeyDTO from '../../../dtos/IWalletKeyDTO';

class BlockcypherCreateWalletService {
  public async execute(): Promise<IWalletKeyDTO | undefined> {
    const response = await network.post('/addrs');

    if (!response) {
      return undefined;
    }

    const { address, wif } = response.data;
    return { publicAddress: address, privateKey: wif };
  }
}

export default BlockcypherCreateWalletService;
