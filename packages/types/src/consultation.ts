export type ConsultationType = 'RENEWAL' | 'NEW';
export type ConsultationStatus =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export interface Consultation {
  id: number;
  email: string;
  phone?: string;
  content: string;
  remark?: string;
  type: ConsultationType;
  status?: ConsultationStatus;
  // renewal인 경우 아래 필드 추가
  currentWebsiteUrl?: string;
  page?: string;
  createdAt: string;
}
