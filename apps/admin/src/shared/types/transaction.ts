export type TransactionType = 'purchase' | 'sale'; // 매입 | 매출
export type TransactionStatus = 'completed' | 'pending' | 'cancelled'; // 완료 | 대기 | 취소
export type PaymentMethod = 'card' | 'cash' | 'transfer' | 'etc'; // 카드 | 현금 | 계좌이체 | 기타

export interface Transaction {
  id: number;
  type: TransactionType;
  customerName: string; // 거래처명
  amount: number; // 금액
  status: TransactionStatus;
  paymentMethod: PaymentMethod;
  transactionDate: string; // 거래일
  description?: string; // 비고
  createdAt: string; // 등록일
}

