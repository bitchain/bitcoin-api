export default interface IWalletBalanceDTO {
  publicAddress: string;
  balance: number;
  confirmedBalance: number;
  unconfirmedBalance: number;
}
