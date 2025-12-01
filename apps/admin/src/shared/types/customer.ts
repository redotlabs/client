export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  lastLoginAt?: string;
  appCount: number;
}

export interface App {
  id: number;
  name: string;
  domain: string;
  status: 'active' | 'inactive';
  createdAt: string;
  lastDeployedAt?: string;
}

