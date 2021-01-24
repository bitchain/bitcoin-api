import { container } from 'tsyringe';

import IBlockchainProvider from './models/IBlockchainProvider';

import BlockcypherProvider from './implementations/BlockcypherProvider';
import BitcoreProvider from './implementations/BitcoreProvider';

const providers = {
  blockcypher: container.resolve(BlockcypherProvider),
  bitcore: container.resolve(BitcoreProvider),
};

container.registerInstance<IBlockchainProvider>(
  'BlockchainProvider',
  providers.blockcypher,
);
