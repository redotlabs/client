import type { Customer } from '@/shared/types';
import { Badge, Button, TableCell, TableRow } from '@redotlabs/ui';
import { cn } from '@redotlabs/utils';
import { format } from 'date-fns';
import CustomerSheetButton from './customer-sheet-button';

interface CustomerTableRowProps {
  customer: Customer;
  order: number;
}

const CustomerTableRow = ({ customer, order }: CustomerTableRowProps) => {
  return (
    <TableRow
      className={cn(
        'border-b-2 border-gray-100 text-sm font-medium text-gray-800',
        '[&>td]:p-3'
      )}
    >
      <TableCell align="center">{order}</TableCell>
      <TableCell align="center">
        <CustomerSheetButton customer={customer}>
          <Button variant="text" size="sm" className="p-0 underline">
            {customer.id}
          </Button>
        </CustomerSheetButton>
      </TableCell>
      <TableCell align="center">{customer.name}</TableCell>
      <TableCell align="center">{customer.email}</TableCell>
      <TableCell align="center">{customer.phone}</TableCell>
      <TableCell align="center">{customer.company || '-'}</TableCell>
      <TableCell align="center">
        <Badge
          size="sm"
          color={customer.status === 'active' ? 'success' : 'default'}
          className="w-fit"
        >
          {customer.status === 'active' ? '활성' : '비활성'}
        </Badge>
      </TableCell>
      <TableCell align="center">
        {format(new Date(customer.createdAt), 'yyyy-MM-dd HH:mm')}
      </TableCell>
    </TableRow>
  );
};

export default CustomerTableRow;

