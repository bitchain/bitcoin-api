export interface Provider {
  providerKey: string;
  createdAt?: Date;
  updatedAt?: Date;
  success?: number;
  fails?: number;
  calls?: number;
}
