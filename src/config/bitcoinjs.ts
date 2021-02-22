import { networks } from 'bitcoinjs-lib';

const { testnet, bitcoin } = networks;

const network = process.env.NETWORK_TYPE === 'mainnet' ? bitcoin : testnet;

export const bitcoinjs = { type: network };
