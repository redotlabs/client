import { Button, Table, TableBody } from '@redotlabs/ui';
import { RHFSelect } from '@repo/ui';
import type { Transaction } from '@/shared/types';
import TransactionTableHeader from './ui/transaction-table-header';
import TransactionTableRow from './ui/transaction-table-row';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 1,
    type: 'sale',
    customerName: '테크컴퍼니',
    amount: 5000000,
    status: 'completed',
    paymentMethod: 'transfer',
    transactionDate: '2025-11-15T10:00:00.000Z',
    description: '웹사이트 개발 비용',
    createdAt: '2025-11-15T10:00:00.000Z',
  },
  {
    id: 2,
    type: 'purchase',
    customerName: '서버호스팅',
    amount: 500000,
    status: 'completed',
    paymentMethod: 'card',
    transactionDate: '2025-11-14T14:30:00.000Z',
    description: '월간 서버 호스팅 비용',
    createdAt: '2025-11-14T14:30:00.000Z',
  },
  {
    id: 3,
    type: 'sale',
    customerName: '디자인스튜디오',
    amount: 3000000,
    status: 'pending',
    paymentMethod: 'transfer',
    transactionDate: '2025-11-13T09:00:00.000Z',
    description: '랜딩 페이지 제작',
    createdAt: '2025-11-13T09:00:00.000Z',
  },
  {
    id: 4,
    type: 'purchase',
    customerName: 'AWS',
    amount: 800000,
    status: 'completed',
    paymentMethod: 'card',
    transactionDate: '2025-11-12T16:45:00.000Z',
    description: '클라우드 인프라 비용',
    createdAt: '2025-11-12T16:45:00.000Z',
  },
  {
    id: 5,
    type: 'sale',
    customerName: '마케팅그룹',
    amount: 2500000,
    status: 'completed',
    paymentMethod: 'cash',
    transactionDate: '2025-11-10T11:20:00.000Z',
    description: 'CMS 시스템 구축',
    createdAt: '2025-11-10T11:20:00.000Z',
  },
  {
    id: 6,
    type: 'purchase',
    customerName: '사무용품',
    amount: 150000,
    status: 'completed',
    paymentMethod: 'card',
    transactionDate: '2025-11-08T13:30:00.000Z',
    description: '사무용품 구매',
    createdAt: '2025-11-08T13:30:00.000Z',
  },
  {
    id: 7,
    type: 'sale',
    customerName: '소프트웨어랩',
    amount: 10000000,
    status: 'pending',
    paymentMethod: 'transfer',
    transactionDate: '2025-11-07T15:00:00.000Z',
    description: 'ERP 시스템 개발',
    createdAt: '2025-11-07T15:00:00.000Z',
  },
  {
    id: 8,
    type: 'purchase',
    customerName: '디자인 라이센스',
    amount: 300000,
    status: 'cancelled',
    paymentMethod: 'card',
    transactionDate: '2025-11-05T10:00:00.000Z',
    description: 'Figma 연간 구독 (취소됨)',
    createdAt: '2025-11-05T10:00:00.000Z',
  },
] as const;

const TransactionPage = () => {
  const [data, setData] =
    useState<(typeof MOCK_TRANSACTIONS)[number][]>(MOCK_TRANSACTIONS);

  const form = useForm({
    defaultValues: {
      type: '',
    },
  });

  const onSubmit = ({ type }: { type: string }) => {
    const filteredTransactions = type
      ? MOCK_TRANSACTIONS.filter((t) => t.type === type)
      : MOCK_TRANSACTIONS;

    setData(filteredTransactions);
  };

  const totalSales = MOCK_TRANSACTIONS.filter(
    (t) => t.type === 'sale' && t.status === 'completed'
  ).reduce((sum, t) => sum + t.amount, 0);

  const totalPurchases = MOCK_TRANSACTIONS.filter(
    (t) => t.type === 'purchase' && t.status === 'completed'
  ).reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalSales - totalPurchases;

  return (
    <main className="p-10 container mx-auto flex-1">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">매입/매출 관리</h1>
          <p className="text-gray-500 mt-1">총 {data.length}건의 거래</p>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
          <h3 className="text-sm font-medium text-blue-800 mb-2">총 매출</h3>
          <p className="text-2xl font-bold text-blue-900">
            {totalSales.toLocaleString()}원
          </p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-5">
          <h3 className="text-sm font-medium text-red-800 mb-2">총 매입</h3>
          <p className="text-2xl font-bold text-red-900">
            {totalPurchases.toLocaleString()}원
          </p>
        </div>
        <div
          className={`border rounded-lg p-5 ${netProfit >= 0 ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}
        >
          <h3
            className={`text-sm font-medium mb-2 ${netProfit >= 0 ? 'text-green-800' : 'text-gray-800'}`}
          >
            순이익
          </h3>
          <p
            className={`text-2xl font-bold ${netProfit >= 0 ? 'text-green-900' : 'text-gray-900'}`}
          >
            {netProfit.toLocaleString()}원
          </p>
        </div>
      </div>

      {/* 필터 셀렉트 */}
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="py-4 flex items-center justify-end gap-4"
        >
          <RHFSelect
            name="type"
            label="거래 구분"
            labelPlacement="left"
            size="sm"
            placeholder="전체"
            options={[
              { label: '전체', value: '' },
              { label: '매출', value: 'sale' },
              { label: '매입', value: 'purchase' },
            ]}
          />
          <Button type="submit" size="sm">
            검색
          </Button>
        </form>
      </FormProvider>

      {/* 거래 목록 테이블 */}
      <Table className="w-full">
        <TransactionTableHeader />
        <TableBody>
          {data.map((transaction, index) => (
            <TransactionTableRow
              key={transaction.id}
              transaction={transaction}
              order={index + 1}
            />
          ))}
        </TableBody>
      </Table>
    </main>
  );
};

export default TransactionPage;
