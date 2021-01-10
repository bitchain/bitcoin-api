export default interface IPublicWalletInfoDTO {
  publicAddress: string;
  totalAmountReceived: number;
  totalAmountSent: number;
  balance: number;
  unconfirmedBalance: number;
}
