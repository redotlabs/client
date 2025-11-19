export type InquiryStatus =
  | 'UNPROCESSED'
  | 'PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export interface Inquiry {
  id: number;
  customerId: number;
  inquiryNumber: string;
  inquirerName: string;
  title: string;
  content: string;
  status: InquiryStatus;
  createdAt: string;
  phone?: string;
  email?: string;
}
