# Bitchain Network

[![CircleCI](https://circleci.com/gh/wladimirgrf/bitchain-network.svg?style=svg)](https://circleci.com/gh/wladimirgrf/bitchain-network)
[![CI](https://github.com/wladimirgrf/bitchain-network/actions/workflows/main.yml/badge.svg)]()

Bitchain Network access the Main and Test Bitcoin blockchains. This application is a simple, mostly RESTful JSON API, accessed over HTTP or HTTPS.

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
|<img height="60" src="https://cdn.worldvectorlogo.com/logos/nodejs-1.svg"> | <img alt="node version" src="https://img.shields.io/badge/nodejs-v14.15-blue"> |
|<img height="35" src="https://cdn.worldvectorlogo.com/logos/express-109.svg"> | <img alt="express version" src="https://img.shields.io/badge/express-v4.17-blue"> |
|<img height="48" src="https://cdn.worldvectorlogo.com/logos/prisma-2.svg"> | <img alt="prisma version" src="https://img.shields.io/badge/prisma-v2.17-blue"> |
|<img height="55" src="https://cdn.worldvectorlogo.com/logos/typescript.svg"> | <img alt="typescript version" src="https://img.shields.io/badge/typescript-v4.1-blue"> |
|<img height="55" src="https://cdn.worldvectorlogo.com/logos/eslint-1.svg"> | <img alt="eslint version" src="https://img.shields.io/badge/eslint-v7.17-blue"> |
|<img height="55" src="https://cdn.worldvectorlogo.com/logos/prettier-2.svg"> | <img alt="prettier version" src="https://img.shields.io/badge/prettier-v2.2-blue"> |
|<img height="40" src="https://cdn.worldvectorlogo.com/logos/bitpay.svg"> | <img alt="bitcore version" src="https://img.shields.io/badge/bitcore_lib-v8.24-blue"> |


## ▶️ Getting started

```bash
$ git clone https://github.com/wladimirgrf/bitchain-network.git
$ cd bitchain-network
```

Bitchain Network needs Postgresql. You can configure the connection at `.env`
> ###### Use .env.example as a reference.

```bash
$ npm install
 
# Once the Postgresql is running, execute the migrations
$ npx prisma migrate dev --preview-feature
 
$ npm run dev:server
```
This will launch the Network service at `http://localhost:3333/`.

### 🟣 GET

#### `/wallets/:address`: Get wallet balance and transactions history

> ###### `:address` is a string representing the public address you're interested in querying.
> ###### Example: `tb1qe8ayn3j3adu72496v48v5cvj40gqpjz09uh800`

<details>
<summary>Response example</summary>
<br>
  
```json
{
  "publicAddress": "tb1qe8ayn3j3adu72496v48v5cvj40gqpjz09uh800",
  "balance": 1030000,
  "confirmedBalance": 1030000,
  "unconfirmedBalance": 0,
  "referenceTransactions": [
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


#### `/transactions/:id`: Get transaction information

> ###### `:id` is a string representing the hex-encoded transaction hash you're interested in querying.
> ###### Example: `d3571c42e5379ea70bce0c2c3c571018a293c5598dad4b2e0c0b7b4f0e625c53`

<details>
<summary>Response example</summary>
<br>
  
```json
{
  "publicId": "d3571c42e5379ea70bce0c2c3c571018a293c5598dad4b2e0c0b7b4f0e625c53",
  "fee": 24547,
  "confirmations": 4,
  "walletsFrom": [
    {
      "publicAddress": "tb1q3yyq37lalgq0chareur9yykgtgpqwztt5uezvz",
      "value": 78836818
    },
    ...
  ],
  "walletsTo": [
    {
      "publicAddress": "mhfNudm6YDYnYkegFSjcsppucpAA8TRviD",
      "value": 100000000
    },
    ...
  ]
}
```
</details>

---

### 🟢 POST

#### `/wallets/create`: Create a new Wallet
> ###### `privateKey` is a secret number that allows bitcoins to be spent, so be careful when handling it!

<details>
<summary>Response example</summary>
<br>
  
```json
{
  "publicAddress": "mffzq5WLcJVsokpSjVgPmjPmUCK5K2UoZN",
  "privateKey": "cW33mrcvCY2YzoFegug4xfQ8U4yNEAeLRUs2z78ZwCwb4w1Fn35K"
}
```
</details>


#### `/transactions/fee`: Get estimated fee for a transaction

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


#### `/transactions/create`: Create and broadcast a transaction

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
  "publicId": "b81fcd39b24616a260b4816d93c4ab229e2e9468fd19da6a127996a8a842fbe0",
  "fee": 15200,
  "walletsFrom": [
    {
      "publicAddress": "mjDaJzEDCjiS86jJWmpn38nGe2A9N7EStd",
      "value": 83400
    }
  ],
  "walletsTo": [
    {
      "publicAddress": "muwAf337HUDpuajeA2yERod4bPZyWpcqbd",
      "value": 1000
    },
    ...
  ]
}
```
</details>

</br>

NOTE: All currency amounts are in units of satoshis (1/100,000,000 of a bitcoin).


## 💻 Development Process

The contribution workflow is described in [CONTRIBUTING.md](CONTRIBUTING.md).

## 📝 License

Bitchain Network is released under the MIT License. Please refer to the [LICENSE](LICENSE) file that accompanies this project for more information including complete terms and conditions.
