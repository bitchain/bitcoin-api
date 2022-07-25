### bitcoin

[![CircleCI](https://circleci.com/gh/bitchain/bitcoin.svg?style=svg)](https://circleci.com/gh/bitchain/bitcoin)
[![CI](https://github.com/bitchain/bitcoin/actions/workflows/main.yml/badge.svg)]()

This project is a proof of concept for the Bitcoin's Mainnet and Testnet. 
This RESTful API is designed to support multiple blockchain providers. Can be an external API like BlockCypher or even a full node. The goal is to ensure availability even if one of the providers is offline.

You can access the `/shared/providers` folder to create your own implementation.

## ✅ Main Features
- Shows the Wallet Balance
- Shows the Wallet Transactions History
- Creates a Wallet
- Shows Transaction details
- Creates and Broadcast a Transaction
- Supports multiple Bitcoin providers

## 🌍 Ecosystem

Below the technologies, used to build this API:

|                      Name                                   |                         Status                          |
|:-----------------------------------------------------------:|:-------------------------------------------------------:|
|<img height="65" src="https://cdn.worldvectorlogo.com/logos/nodejs-1.svg"> | <img alt="node version" src="https://img.shields.io/badge/nodejs-v14.15.4-blue"> |
|<img height="38" src="https://cdn.worldvectorlogo.com/logos/express-109.svg"> | <img alt="express version" src="https://img.shields.io/badge/express-v4.17.1-blue">|
|<img height="20" src="https://axios-http.com/assets/logo.svg"> | <img alt="axios version" src="https://img.shields.io/badge/axios-v0.21.4-blue">|
|<img height="60" src="https://cdn.worldvectorlogo.com/logos/typescript.svg"> | <img alt="typescript version" src="https://img.shields.io/badge/typescript-v4.1.3-blue"> |
|<img height="55" src="https://raw.githubusercontent.com/arb/celebrate/master/images/logo.svg"> | <img alt="celebrate version" src="https://img.shields.io/badge/celebrate-v13.0.4-blue">|
|<img height="60" src="https://cdn.worldvectorlogo.com/logos/eslint-1.svg"> | <img alt="eslint version" src="https://img.shields.io/badge/eslint-v7.17.0-blue"> |
|<img height="60" src="https://cdn.worldvectorlogo.com/logos/prettier-2.svg"> | <img alt="prettier version" src="https://img.shields.io/badge/prettier-v2.2.1-blue"> |
|<img height="42" src="https://cdn.worldvectorlogo.com/logos/bitpay.svg"> | <img alt="bitcore version" src="https://img.shields.io/badge/bitcore_lib-v8.24.1-blue"> |



## ▶️ Getting started

```bash
$ git clone https://github.com/bitchain/bitcoin.git

$ cd bitcoin

$ npm install

$ npm run dev:server
```

This will launch the Network service at `http://localhost:3333/`.

### 🟣 GET

**`/wallets/:address`: Get wallet balance and transactions history**

> <sup>`:address` is a string representing the public address you're interested in querying.</sup>

> <sup>Example: `tb1qe8ayn3j3adu72496v48v5cvj40gqpjz09uh800` </sup>

<details>
<summary>Response example</summary>
<br>

```json
{
  "address": "tb1qe8ayn3j3adu72496v48v5cvj40gqpjz09uh800",
  "balance": 1030000,
  "confirmedBalance": 1030000,
  "unconfirmedBalance": 0,
  "transactionsReference": [
    {
      "transactionId": "d8db85b8aa834bab65c59eac0159ad166c3b89e09a06520412c9821e71222f52",
      "confirmations": 10,
      "value": 10000,
      "blockHeight": 1938604
    },
    ...
  ]
}
```
</details>


**`/transactions/:id`: Get transaction information**

> <sup>`:id` is a string representing the hex-encoded transaction hash you're interested in querying.</sup>

> <sup>Example: `d3571c42e5379ea70bce0c2c3c571018a293c5598dad4b2e0c0b7b4f0e625c53` </sup>

<details>
<summary>Response example</summary>
<br>

```json
{
  "id": "d3571c42e5379ea70bce0c2c3c571018a293c5598dad4b2e0c0b7b4f0e625c53",
  "fee": 24547,
  "confirmations": 4,
  "date": "2021-03-02T21:02:23.000Z",
  "transactionInput": [
    {
      "address": "tb1q3yyq37lalgq0chareur9yykgtgpqwztt5uezvz",
      "value": 78836818
    },
    ...
  ],
  "transactionOutput": [
    {
      "address": "mhfNudm6YDYnYkegFSjcsppucpAA8TRviD",
      "value": 100000000
    },
    ...
  ]
}
```
</details>



### 🟢 POST

**`/wallets/create`: Create a new Wallet**
> <sup> `privateKey` is a secret number that allows bitcoins to be spent, so be careful when handling it!</sup>

<details>
<summary>Response example</summary>
<br>

```json
{
  "address": "mffzq5WLcJVsokpSjVgPmjPmUCK5K2UoZN",
  "privateKey": "cW33mrcvCY2YzoFegug4xfQ8U4yNEAeLRUs2z78ZwCwb4w1Fn35K"
}
```
</details>


**`/transactions/fee`: Get estimated fee for a transaction**

<details>
<summary>Request example</summary>
<br>

```json
{
  "addressFrom": "muwAf337HUDpuajeA2yERod4bPZyWpcqbd",
  "addressTo": "mjDaJzEDCjiS86jJWmpn38nGe2A9N7EStd",
  "value": 10000
}
```
</details>

<details>
<summary>Response example</summary>
<br>

```json
{
  "transactionEstimatedFee": 15200
}
```
</details>


**`/transactions/create`: Create and broadcast a transaction**

<details>
<summary>Request example</summary>
<br>

```json
{
  "privateKey": "cW33mrcvCY2YzoFegug4xfQ8U4yNEAeLRUs2z78ZwCwb4w1Fn35K",
  "addressTo": "muwAf337HUDpuajeA2yERod4bPZyWpcqbd",
  "value": 1000
}
```
</details>

<details>
<summary>Response example</summary>
<br>

```json
{
  "id": "9b04e5034e547e0e47291488a2986e5120b0dd38e01541f7ee71136d2a676877",
  "fee": 13700,
  "transactionInput": [
    {
      "address": "mjDaJzEDCjiS86jJWmpn38nGe2A9N7EStd",
      "value": 41700
    }
  ],
  "transactionOutput": [
    {
      "address": "muwAf337HUDpuajeA2yERod4bPZyWpcqbd",
      "value": 1000
    },
    ...
  ]
}
```
</details>

</br>

NOTE: All currency amounts are in units of satoshis (1/100,000,000 of a Bitcoin).


## 💻 Development Process

The contribution workflow is described in [CONTRIBUTING.md](CONTRIBUTING.md).

## 📝 License

Bitchain Network is released under the MIT License. Please refer to the [LICENSE](LICENSE) file that accompanies this project for more information including complete terms and conditions.

## 💜 Special Thanks

<a href="https://github.com/blockcypher">
  <img src="https://live.blockcypher.com/static/img/logo.svg" alt="BlockCypher" height="40">
</a>
