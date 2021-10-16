export default interface IDependencyProvider {
  resolve(useCase: any): any;
}
