export interface Provider {
  id?: string;
  score?: number;
  calls?: number;
  instance: string;
  injectionToken: string;
}
