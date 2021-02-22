import axios from 'axios';

const testnet = 'https://api.blockcypher.com/v1/btc/test3';
const mainnet = 'https://api.blockcypher.com/v1/btc/main';

const network = process.env.NETWORK_TYPE === 'mainnet' ? mainnet : testnet;

const api = axios.create({
  baseURL: network,
});

export const blockcypher = { api };
