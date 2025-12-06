export type ConsultationType = 'RENEWAL' | 'NEW';

export interface Consultation {
  id: number;
  email: string;
  phone?: string;
  content: string;
  type: ConsultationType;
  // renewal인 경우 아래 필드 추가
  currentWebsiteUrl?: string;
  page?: string;
  createdAt: string;
}
