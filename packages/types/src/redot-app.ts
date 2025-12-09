export type RedotAppStatus = 'ACTIVE' | 'INACTIVE';

export interface RedotApp {
  id: number;
  name: string;
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

export type AppPlanType = 'FREE' | 'PRO' | 'ENTERPRISE';

export interface AppPlan {
  id: number;
  planType: AppPlanType;
  displayName: string;
  description: string;
  price: number;
  maxPageViews: number;
  maxPages: number;
  maxManagers: number;
  createdAt: string;
}
