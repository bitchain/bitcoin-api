interface INetworkConfig {
  networkType: 'mainnet' | 'testnet';
}

export default {
  networkType: process.env.NETWORK_TYPE,
} as INetworkConfig;
