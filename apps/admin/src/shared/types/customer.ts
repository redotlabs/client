export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  lastLoginAt?: string;
}

