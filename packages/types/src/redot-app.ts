export type RedotAppStatus = 'ACTIVE' | 'INACTIVE';

export interface RedotApp {
  id: number;
  appName: string;
  status: RedotAppStatus;
  isCreatedManager: boolean;
  createdAt: string;
}

export interface SiteSetting {
  logoUrl: string | null;
  siteName: string | null;
  subdomain: string;
  customDomain: string | null;
}

export interface StyleInfo {
  color: string;
  font: string;
  theme: string;
}
