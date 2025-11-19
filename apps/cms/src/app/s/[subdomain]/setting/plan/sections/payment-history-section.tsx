import React from 'react';

import {
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@redotlabs/ui';
import { Receipt } from 'lucide-react';

const PAYMENT_HISTORY = [
  {
    id: 1,
    date: '2025-11-01',
    description: 'Pro 플랜 월간 구독',
    amount: 29000,
    status: 'completed',
  },
  {
    id: 2,
    date: '2025-10-01',
    description: 'Pro 플랜 월간 구독',
    amount: 29000,
    status: 'completed',
  },
  {
    id: 3,
    date: '2025-09-01',
    description: 'Pro 플랜 월간 구독',
    amount: 29000,
    status: 'completed',
  },
];

const PaymentHistorySection = () => {
  return (
    <section className="mt-12">
      <h2 className="text-lg font-semibold mb-4">결제 내역</h2>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>설명</TableHead>
            <TableHead>날짜</TableHead>
            <TableHead>결제 금액</TableHead>
            <TableHead>결제 상태</TableHead>
            <TableHead>영수증</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {PAYMENT_HISTORY.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell align="center">
                <div className="flex justify-center items-center gap-2">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Receipt size={20} className="text-gray-600" />
                  </div>
                  {payment.description}
                </div>
              </TableCell>
              <TableCell align="center">{payment.date}</TableCell>
              <TableCell align="center">
                {payment.amount.toLocaleString()}
              </TableCell>
              <TableCell align="center">
                <Badge
                  color={payment.status === 'completed' ? 'success' : 'danger'}
                  size="sm"
                  className="w-fit"
                >
                  {payment.status === 'completed' ? '완료' : '실패'}
                </Badge>
              </TableCell>
              <TableCell align="center">
                <Button variant="text" size="sm">
                  영수증
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default PaymentHistorySection;
