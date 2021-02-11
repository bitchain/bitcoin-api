import axios, { AxiosStatic } from 'axios';
import { networks, Network } from 'bitcoinjs-lib';
import { Networks } from 'bitcore-lib';

interface INetworkConfig {
  type: string;
  bitcoinjs_type: Network;
  bitcore_type: string;
  blockcypher_api: AxiosStatic;
  bitcore_api: AxiosStatic;
}

const testnet = {
  name: 'testnet',
  bitcoinjs_type: networks.testnet,
  bitcore_type: Networks.testnet.name,
  bitcore_url: 'https://api.bitcore.io/api/BTC/testnet',
  blockcypher_url: 'https://api.blockcypher.com/v1/btc/test3',
};

const mainnet = {
  name: 'mainnet',
  bitcoinjs_type: networks.bitcoin,
  bitcore_type: Networks.mainnet.name,
  bitcore_url: 'https://api.bitcore.io/api/BTC/mainnet',
  blockcypher_url: 'https://api.blockcypher.com/v1/btc/main',
};

const network = process.env.NETWORK_TYPE === mainnet.name ? mainnet : testnet;

const blockcypher_api = axios.create({
  baseURL: network.blockcypher_url,
});

const bitcore_api = axios.create({
  baseURL: network.bitcore_url,
});

export default {
  type: network.name,
  bitcoinjs_type: network.bitcoinjs_type,
  bitcore_type: network.bitcore_type,
  bitcore_api,
  blockcypher_api,
} as INetworkConfig;
