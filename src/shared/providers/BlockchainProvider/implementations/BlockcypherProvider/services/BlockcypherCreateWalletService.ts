import IWalletKeyDTO from '@modules/wallets/dtos/IWalletKeyDTO';

import network from '../network';

class BlockcypherCreateWalletService {
  public async execute(): Promise<IWalletKeyDTO> {
    const response = await network.post('/addrs');

    const { address, wif } = response.data;
    return { publicAddress: address, privateKey: wif };
  }
}

export default BlockcypherCreateWalletService;
