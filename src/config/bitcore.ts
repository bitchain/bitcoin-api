import axios, { AxiosError } from 'axios';
import { Networks } from 'bitcore-lib';

const testnet = {
  type: Networks.testnet.name,
  url: 'https://api.bitcore.io/api/BTC/testnet',
};

const mainnet = {
  type: Networks.mainnet.name,
  url: 'https://api.bitcore.io/api/BTC/mainnet',
};

const network = process.env.NETWORK_TYPE === 'mainnet' ? mainnet : testnet;

const api = axios.create({
  baseURL: network.url,
});

export const bitcore = {
  type: network.type,
  api,
};

export declare type IntegrationError = AxiosError;
