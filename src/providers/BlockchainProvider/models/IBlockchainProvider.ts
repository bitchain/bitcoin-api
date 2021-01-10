export default interface IBlockchainProvider {
  getWallet(publicAddress: string): Promise<any>;
  createWallet(): Promise<any>;
}
