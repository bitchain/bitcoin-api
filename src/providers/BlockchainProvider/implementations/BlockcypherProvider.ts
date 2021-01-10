import axios from 'axios';
import IBlockchainProvider from '../models/IBlockchainProvider';

const network = 'https://api.blockcypher.com/v1/btc/test3';

const api = axios.create({
  baseURL: network,
});

export default class BlockcypherProvider implements IBlockchainProvider {
  public async getWallet(publicAddress: string): Promise<any> {
    const response = await api.post(`/addrs/${publicAddress}`);

    return response.data;
  }

  public async createWallet(): Promise<any> {
    try {
      const response = await api.post('/addrs');

      return response.data;
    } catch (err) {
      console.log(err);
    }

    return null;
  }
}
