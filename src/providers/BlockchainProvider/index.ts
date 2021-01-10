import { container } from 'tsyringe';

import IBlockchainProvider from './models/IBlockchainProvider';

import BlockcypherProvider from './implementations/BlockcypherProvider';

const providers = {
  blockcypher: container.resolve(BlockcypherProvider),
};

container.registerInstance<IBlockchainProvider>(
  'BlockchainProvider',
  providers.blockcypher,
);
