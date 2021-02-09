import axios from 'axios';
import { ECPair, script, payments, networks } from 'bitcoinjs-lib';

import networkConfig from '@config/network';
import { ApplicationError } from '@errors/ApplicationError';

import {
  ICreateTransactionRequestDTO,
  ICreateTransactionResponseDTO,
} from '../../CreateTransactionDTO';
import { ICreateTransactionProvider } from '../ICreateTransactionProvider';

const appNetworks = {
  mainnet: {
    endpoint: process.env.BLOCKCYPHER_MAINNET_API,
    type: networks.bitcoin,
  },
  testnet: {
    endpoint: process.env.BLOCKCYPHER_TESTNET_API,
    type: networks.testnet,
  },
};

const blockcypherAPI = axios.create({
  baseURL: appNetworks[networkConfig.networkType].endpoint,
});

const blockcypherNetwork = appNetworks[networkConfig.networkType].type;

interface Input {
  addresses: string[];
  value: number;
}

interface Output {
  addresses: string[];
  value: number;
}

export class BlockcypherCreateTransactionProvider
  implements ICreateTransactionProvider {
  public providerKey = 'blockcypher_transaction_create';

  public async execute({
    privateKey,
    addressTo,
    value,
  }: ICreateTransactionRequestDTO): Promise<ICreateTransactionResponseDTO> {
    try {
      const btcPrivateKey = ECPair.fromWIF(privateKey, blockcypherNetwork);

      const { address: addressFrom } = payments.p2pkh({
        pubkey: btcPrivateKey.publicKey,
        network: blockcypherNetwork,
      });

      const transactionInputs = [{ addresses: [addressFrom] }];
      const transactionOutputs = [{ addresses: [addressTo], value }];

      const responseTXNew = await blockcypherAPI.post('/txs/new', {
        inputs: transactionInputs,
        outputs: transactionOutputs,
      });

      const temporaryTransaction = responseTXNew.data;

      temporaryTransaction.pubkeys = [btcPrivateKey.publicKey.toString('hex')];

      const signature = btcPrivateKey.sign(
        Buffer.from(temporaryTransaction.tosign[0], 'hex'),
      );
      temporaryTransaction.signatures = [
        script.signature.encode(signature, 0x01).toString('hex').slice(0, -2),
      ];

      const responseTXSend = await blockcypherAPI.post(
        '/txs/send',
        temporaryTransaction,
      );

      const { tx } = responseTXSend.data;

      const { hash, fees, inputs, outputs } = tx;

      const walletsFrom = inputs.map((input: Input) => ({
        publicAddress: input.addresses[0],
        value: input.value,
      }));

      const walletsTo = outputs.map((output: Output) => ({
        publicAddress: output.addresses[0],
        value: output.value,
      }));

      return {
        publicId: hash,
        fee: fees,
        walletsFrom,
        walletsTo,
      };
    } catch (err) {
      console.log(err);
      throw new Error();
    }
  }
}
