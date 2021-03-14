import { ECPair, script, payments } from 'bitcoinjs-lib';

import { blockcypher } from '@config/blockcypher';
import { bitcoinjs } from '@config/bitcoinjs';

import { ApplicationError } from '@errors/ApplicationError';

import {
  ICreateTransactionRequestDTO,
  ICreateTransactionResponseDTO,
} from '../../CreateTransactionDTO';
import { ICreateTransactionProvider } from '../ICreateTransactionProvider';

interface Input {
  addresses: string[];
  output_value: number;
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
      const btcPrivateKey = ECPair.fromWIF(privateKey, bitcoinjs.type);

      const { address: addressFrom } = payments.p2pkh({
        pubkey: btcPrivateKey.publicKey,
        network: bitcoinjs.type,
      });

      const transactionInputs = [{ addresses: [addressFrom] }];
      const transactionOutputs = [{ addresses: [addressTo], value }];

      const responseTXNew = await blockcypher.api.post('/txs/new', {
        inputs: transactionInputs,
        outputs: transactionOutputs,
      });

      const temporaryTransaction = responseTXNew.data;

      temporaryTransaction.pubkeys = [];

      temporaryTransaction.signatures = temporaryTransaction.tosign.map(
        (inputTosign: string) => {
          const pubKey = btcPrivateKey.publicKey.toString('hex');
          temporaryTransaction.pubkeys.push(pubKey);

          const signBuffer = Buffer.from(inputTosign, 'hex');
          const signature = btcPrivateKey.sign(signBuffer);

          return script.signature
            .encode(signature, 0x01)
            .toString('hex')
            .slice(0, -2);
        },
      );

      const responseTXSend = await blockcypher.api.post(
        '/txs/send',
        temporaryTransaction,
      );

      const { hash, fees, inputs, outputs } = responseTXSend.data.tx;

      const walletsFrom = inputs.map((input: Input) => ({
        address: input.addresses[0],
        value: input.output_value,
      }));

      const walletsTo = outputs.map((output: Output) => ({
        address: output.addresses[0],
        value: output.value,
      }));

      return {
        id: hash,
        fee: fees,
        walletsFrom,
        walletsTo,
      };
    } catch (error) {
      const { response } = error;
      throw new ApplicationError(
        response.data.errors[0].error,
        response.status,
      );
    }
  }
}
