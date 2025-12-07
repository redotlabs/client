import type { Transaction } from '@/shared/types';
import { Badge, TableCell, TableRow } from '@redotlabs/ui';
import { cn } from '@redotlabs/utils';
import { format } from 'date-fns';

interface TransactionTableRowProps {
  transaction: Transaction;
  order: number;
}

const getTransactionTypeLabel = (type: Transaction['type']) => {
  return type === 'sale' ? '매출' : '매입';
};

const getTransactionTypeColor = (type: Transaction['type']) => {
  return type === 'sale' ? 'text-blue-600 bg-blue-50' : 'text-red-600 bg-red-50';
};

const getPaymentMethodLabel = (method: Transaction['paymentMethod']) => {
  const labels = {
    card: '카드',
    cash: '현금',
    transfer: '계좌이체',
    etc: '기타',
  };
  return labels[method];
};

const getStatusLabel = (status: Transaction['status']) => {
  const labels = {
    completed: '완료',
    pending: '대기',
    cancelled: '취소',
  };
  return labels[status];
};

const getStatusColor = (status: Transaction['status']) => {
  const colors = {
    completed: 'success',
    pending: 'warning',
    cancelled: 'default',
  };
  return colors[status] as 'success' | 'warning' | 'default';
};

const TransactionTableRow = ({
  transaction,
  order,
}: TransactionTableRowProps) => {
  return (
    <TableRow
      className={cn(
        'border-b-2 border-gray-100 text-sm font-medium text-gray-800',
        '[&>td]:p-3'
      )}
    >
      <TableCell align="center">{order}</TableCell>
      <TableCell align="center">#{transaction.id}</TableCell>
      <TableCell align="center">
        <span
          className={cn(
            'px-2 py-1 rounded-md text-xs font-bold',
            getTransactionTypeColor(transaction.type)
          )}
        >
          {getTransactionTypeLabel(transaction.type)}
        </span>
      </TableCell>
      <TableCell align="center">{transaction.customerName}</TableCell>
      <TableCell align="right">
        <span
          className={cn(
            'font-semibold',
            transaction.type === 'sale' ? 'text-blue-600' : 'text-red-600'
          )}
        >
          {transaction.type === 'sale' ? '+' : '-'}
          {transaction.amount.toLocaleString()}원
        </span>
      </TableCell>
      <TableCell align="center">
        {getPaymentMethodLabel(transaction.paymentMethod)}
      </TableCell>
      <TableCell align="center">
        <Badge size="sm" color={getStatusColor(transaction.status)}>
          {getStatusLabel(transaction.status)}
        </Badge>
      </TableCell>
      <TableCell align="center">
        {format(new Date(transaction.transactionDate), 'yyyy-MM-dd')}
      </TableCell>
      <TableCell align="center">
        <span className="text-gray-600 text-xs">
          {transaction.description || '-'}
        </span>
      </TableCell>
    </TableRow>
  );
};

export default TransactionTableRow;

