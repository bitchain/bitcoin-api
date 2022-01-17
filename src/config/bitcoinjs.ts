import { networks } from 'bitcoinjs-lib';

const { testnet, bitcoin } = networks;

const network =
  process.env.BITCOIN_NETWORK_TYPE === 'mainnet' ? bitcoin : testnet;

export const bitcoinjs = { type: network };
