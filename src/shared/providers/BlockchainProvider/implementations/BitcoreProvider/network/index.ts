import axios from 'axios';
import bitcore from 'bitcore-lib';

import networkConfig from '@config/network';

const networks = {
  mainnet: {
    name: bitcore.Networks.mainnet.name,
    api: axios.create({
      baseURL: 'https://api.bitcore.io/api/BTC/mainnet',
    }),
  },
  testnet: {
    name: bitcore.Networks.testnet.name,
    api: axios.create({
      baseURL: 'https://api.bitcore.io/api/BTC/testnet',
    }),
  },
};

export default networks[networkConfig.networkType];
