import axios from 'axios';

import networkConfig from '../../../../../config/network';

const networks = {
  mainnet: 'https://api.blockcypher.com/v1/btc/main',
  testnet: 'https://api.blockcypher.com/v1/btc/test3',
};

const network = axios.create({
  baseURL: networks[networkConfig.networkType],
});

export default network;
