import network from '../network';

import IWalletKeyDTO from '../../../dtos/IWalletKeyDTO';

class BlockcypherCreateWalletService {
  public async execute(): Promise<IWalletKeyDTO> {
    const response = await network.post('/addrs');

    const { address, wif } = response.data;
    return { publicAddress: address, privateKey: wif };
  }
}

export default BlockcypherCreateWalletService;
