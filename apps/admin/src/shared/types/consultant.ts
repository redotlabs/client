export type ConsultStatus = 'UNPROCESSED' | 'PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface Consultant {
  id: number;
  name: string;
  email: string;
  phone: string;
  isRenewal: boolean;
  currentWebsiteUrl?: string;
  consultContent: string;
  status: ConsultStatus;
  createdAt: string;
}

