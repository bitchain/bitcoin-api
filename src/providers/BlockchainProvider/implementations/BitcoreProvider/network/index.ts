import bitcore from 'bitcore-lib';

import networkConfig from '../../../../../config/network';

const networks = {
  mainnet: {
    name: bitcore.Networks.mainnet.name,
    url: '',
  },
  testnet: {
    name: bitcore.Networks.testnet.name,
    url: 'https://api.bitcore.io/api/BTC/testnet',
  },
};

export default networks[networkConfig.networkType];
